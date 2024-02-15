frappe.ui.form.on('Quotation', {
	refresh(frm) {
	console.log("testing");
	}
})

frappe.ui.form.on('Quotation Item', {
    // customer: function(frm) {
    //     // Call the method to fetch the rate when the customer changes
    //     fetchItemRate();
    // },
   item_code: function(frm, cdt, cdn) {
        var item_code = frappe.model.get_value(cdt, cdn, 'item_code');
        console.log(item_code);
        console.log(frm.doc.customer_name);
        fetchItemRate(frm.doc.customer_name, item_code, cdt, cdn);
    }
});

function fetchItemRate(customer_name, item_code, cdt, cdn) {
    console.log("enter in method");
    // var args = {
    //     "doctype": "Quotation",  // Specify the doctype as Quotation
    //     "customer": cur_frm.doc.customer_name,  // Pass the current customer
    //     "item_code": cur_frm.doc.item_code  // Pass the current item code
    // };

    // Call the server method to fetch the rate
    frappe.call({
        method: "openwayes.api.get_quo_rate",
        args: {
                customer: customer_name,  // Pass the current customer
                item_code: item_code  // Pass the current item code
            },
        callback: function(response) {
            console.log("rehan");
            console.log(response.message);
            // Update the rate field in the Sales Invoice form with the fetched rate
            //cur_frm.set_value("previous_rate", response.message);
            frappe.model.set_value(cdt,cdn,"previous_rate",response.message);
        }
    });
}
