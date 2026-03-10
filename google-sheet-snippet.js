// ================================================================
// GOOGLE SHEETS INTEGRATION
// Replace the URL below with your own Google Apps Script Web App URL
// ================================================================

const SHEET_URL = 'https://script.google.com/macros/s/AKfycbzdcu04UUraQbmX102DHliGLvY2yZ61pDYLTAF1UYV2GPZNuw17o58Q1kNiQQAfLdxC/exec';
 

async function saveToGoogleSheet(receiptNo, date, name, mobileNumber, city, category, payType, amount, amountWords, receivedBy) {
  const payload = {
	token      : "12345",
    receiptNo  : receiptNo,
    date       : date,
    name       : name,
	mobileNumber : mobileNumber,
	city : city,
    category   : category,
    payType    : payType,
    amount     : amount,
    amountWords: amountWords,
    receivedBy : receivedBy
  };

  try {
    const response = await fetch(SHEET_URL, {
      method  : 'POST',
      mode    : 'no-cors',        // required for Google Apps Script
      headers : { 'Content-Type': 'application/json' },
      body    : JSON.stringify(payload)
    });

    // no-cors means we cannot read the response body
    // but if no error is thrown, data was saved successfully
    console.log('✅ Data saved to Google Sheet.');
    return true;

  } catch (error) {
    console.error('❌ Failed to save to Google Sheet:', error);
    alert('⚠️ Receipt could NOT be saved.\nPlease check your internet connection.');
    return false;
  }
}


// ================================================================
// HOW TO CALL THIS INSIDE YOUR generateReceipt() FUNCTION
// Place these lines BEFORE your doc.save(...) line
// ================================================================

/*

  // --- PASTE THIS BLOCK just before doc.save() ---

  // Show saving indicator
  const btn = document.getElementById('genBtn');
  btn.disabled    = true;
  btn.textContent = '⏳ Saving to records...';

  // Save to Google Sheet first, then download PDF
  await saveToGoogleSheet(
    receiptNo,
    dateDisplay,
    name,
    category,
    payType,
    amountNum,
    amountWords,
    receivedBy
  );

  // Now download the PDF
  doc.save(`Receipt_${receiptNo}.pdf`);

  // Reset button
  btn.disabled    = false;
  btn.textContent = '⬇ Generate & Download Receipt PDF';

  // --- END OF BLOCK ---
*/
