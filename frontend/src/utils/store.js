// Reactive Local Storage Store for Sewing Machine Shop Management System

const DEFAULT_SETTINGS = {
  shopName: "SewPro Sewing Machine Shop",
  phone: "+91 98765 43210",
  email: "contact@sewpro.in",
  address: "12, Main Bazar, Near Clock Tower, Kolhapur, Maharashtra",
  gstin: "27AAAAA1111A1Z1",
  pan: "AAAAA1111A",
  currency: "₹",
  invoicePrefix: "INV-2026-",
  startingNumber: 1001,
  defaultGst: 18,
  defaultDiscount: 0,
  enableCredit: true,
  creditLimit: 50000,
  dueDays: 30,
  defaultWarrantyMonths: 12,
  sparePartWarrantyMonths: 3,
  servicePrefix: "SRV-2026-",
  inspectionCharges: 150
};

const INITIAL_PRODUCTS = [
  { id: "p1", name: "Singer Promise 1408", type: "Machine", brand: "Singer", model: "Promise 1408", purchasePrice: 8500, sellingPrice: 11000, stock: 8, minStock: 3, serials: ["SP1408-001", "SP1408-002", "SP1408-003", "SP1408-004", "SP1408-005", "SP1408-006", "SP1408-007", "SP1408-008"] },
  { id: "p2", name: "Usha Janome Dream Stitch", type: "Machine", brand: "Usha", model: "Dream Stitch", purchasePrice: 9000, sellingPrice: 12500, stock: 2, minStock: 4, serials: ["UJDS-901", "UJDS-902"] }, // Low stock
  { id: "p3", name: "Brother GS2700", type: "Machine", brand: "Brother", model: "GS2700", purchasePrice: 12000, sellingPrice: 15999, stock: 5, minStock: 2, serials: ["BR2700-11", "BR2700-12", "BR2700-13", "BR2700-14", "BR2700-15"] },
  { id: "p4", name: "Heavy Duty Bobbin Case", type: "Spare Part", brand: "Generic", model: "HD-BC01", purchasePrice: 150, sellingPrice: 250, stock: 45, minStock: 10, serials: [] },
  { id: "p5", name: "Sewing Machine Motor Belt", type: "Spare Part", brand: "Usha", model: "MB-200", purchasePrice: 120, sellingPrice: 200, stock: 4, minStock: 15, serials: [] }, // Low stock
  { id: "p6", name: "Organ Needles Set (16/100)", type: "Accessory", brand: "Organ", model: "Size 16", purchasePrice: 45, sellingPrice: 80, stock: 120, minStock: 20, serials: [] },
  { id: "p7", name: "Premium Lubricating Oil 100ml", type: "Consumable", brand: "Singer", model: "Lubricant 100", purchasePrice: 60, sellingPrice: 110, stock: 35, minStock: 10, serials: [] }
];

const INITIAL_CUSTOMERS = [
  { id: "c1", name: "Ramesh Patil", mobile: "9823012345", address: "Rajarampuri 2nd Lane, Kolhapur", outstanding: 4500, ledger: [
    { date: "2026-07-10", description: "Opening Outstanding Balance", debit: 4500, credit: 0, balance: 4500 }
  ] },
  { id: "c2", name: "Sunita Deshmukh", mobile: "9764512345", address: "Shahupuri, Kolhapur", outstanding: 0, ledger: [] },
  { id: "c3", name: "Pooja Garments", mobile: "9158098765", address: "Gandhinagar Wholesale Market, Kolhapur", outstanding: 12000, ledger: [
    { date: "2026-08-01", description: "Purchase of Usha Janome Dream Stitch (Qty: 2)", debit: 25000, credit: 0, balance: 25000 },
    { date: "2026-08-02", description: "Payment Received - Cash", debit: 0, credit: 13000, balance: 12000 }
  ] }
];

const INITIAL_SUPPLIERS = [
  { id: "s1", name: "Singer India Distributors", mobile: "9922114400", email: "dist@singerindia.com", address: "Fort, Mumbai", totalPurchases: 150000, totalPaid: 120000, outstanding: 30000 },
  { id: "s2", name: "Vikas Spare Parts Hub", mobile: "9860012233", email: "vikas.spares@gmail.com", address: "Opera House, Mumbai", totalPurchases: 45000, totalPaid: 45000, outstanding: 0 }
];

const INITIAL_SALES = [
  {
    invoiceNumber: "INV-2026-1001",
    date: "2026-08-08",
    customerId: "c3",
    customerName: "Pooja Garments",
    customerMobile: "9158098765",
    items: [
      { productId: "p2", name: "Usha Janome Dream Stitch", type: "Machine", brand: "Usha", model: "Dream Stitch", serialNumber: "UJDS-903", quantity: 2, sellingPrice: 12500 }
    ],
    subtotal: 25000,
    gst: 4500,
    discount: 0,
    total: 25000,
    paid: 13000,
    due: 12000,
    paymentMethod: "Partial Payment",
    paymentStatus: "Partially Paid"
  }
];

const INITIAL_PURCHASES = [
  {
    purchaseInvoiceNumber: "PINV-7892",
    date: "2026-08-01",
    supplierId: "s1",
    supplierName: "Singer India Distributors",
    items: [{ productId: "p1", name: "Singer Promise 1408", quantity: 5, purchasePrice: 8500 }],
    gst: 7650,
    discount: 0,
    total: 50150,
    paid: 30150,
    due: 20000
  }
];

const INITIAL_SERVICES = [
  {
    jobId: "SRV-2026-1001",
    customerId: "c1",
    customerName: "Ramesh Patil",
    customerMobile: "9823012345",
    machineBrand: "Singer",
    machineModel: "Promise 1408",
    serialNumber: "SP1408-009",
    complaint: "Stitch skipping and heavy noise from shuttle hook",
    receivedDate: "2026-08-09",
    expectedDelivery: "2026-08-12",
    technician: "Anil Shinde",
    priority: "High",
    status: "Repairing",
    estimatedCost: 1200,
    partsUsed: [{ id: "p4", name: "Heavy Duty Bobbin Case", quantity: 1, sellingPrice: 250 }],
    labourCharges: 450,
    totalAmount: 700,
    paidAmount: 200,
    dueAmount: 500,
    serviceNotes: "Replaced damaged bobbin case, adjusted timing belt. Oil and general servicing complete.",
    beforePhoto: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=200",
    afterPhoto: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200"
  },
  {
    jobId: "SRV-2026-1002",
    customerId: "c2",
    customerName: "Sunita Deshmukh",
    customerMobile: "9764512345",
    machineBrand: "Usha",
    machineModel: "Dream Stitch",
    serialNumber: "UJDS-811",
    complaint: "Motor running slow, burning smell",
    receivedDate: "2026-08-10",
    expectedDelivery: "2026-08-14",
    technician: "Sunil Mane",
    priority: "Medium",
    status: "Received",
    estimatedCost: 1500,
    partsUsed: [],
    labourCharges: 0,
    totalAmount: 150,
    paidAmount: 150,
    dueAmount: 0,
    serviceNotes: "Inspection done. Motor winding has carbon deposit. Needs replacement or repair."
  }
];

const INITIAL_EXPENSES = [
  { id: "e1", category: "Rent", amount: 15000, date: "2026-08-01", paymentMethod: "Bank Transfer", note: "August Shop Rent" },
  { id: "e2", category: "Electricity", amount: 2450, date: "2026-08-05", paymentMethod: "UPI", note: "MSEB Electric Bill" },
  { id: "e3", category: "Salary", amount: 12000, date: "2026-08-05", paymentMethod: "Cash", note: "Assistant Cashier Salary" }
];

const INITIAL_WARRANTIES = [
  { id: "w1", invoiceNumber: "INV-2026-1001", customerName: "Pooja Garments", productName: "Usha Janome Dream Stitch", serialNumber: "UJDS-903", warrantyMonths: 12, startDate: "2026-08-08", endDate: "2027-08-08", status: "Active" }
];

// Initialize database in localStorage if not present
const getDB = () => {
  const getOrSet = (key, val) => {
    const data = localStorage.getItem(key);
    if (!data) {
      localStorage.setItem(key, JSON.stringify(val));
      return val;
    }
    return JSON.parse(data);
  };

  return {
    settings: getOrSet("sewpro_settings", DEFAULT_SETTINGS),
    products: getOrSet("sewpro_products", INITIAL_PRODUCTS),
    customers: getOrSet("sewpro_customers", INITIAL_CUSTOMERS),
    suppliers: getOrSet("sewpro_suppliers", INITIAL_SUPPLIERS),
    sales: getOrSet("sewpro_sales", INITIAL_SALES),
    purchases: getOrSet("sewpro_purchases", INITIAL_PURCHASES),
    services: getOrSet("sewpro_services", INITIAL_SERVICES),
    expenses: getOrSet("sewpro_expenses", INITIAL_EXPENSES),
    warranties: getOrSet("sewpro_warranties", INITIAL_WARRANTIES)
  };
};

const saveDB = (db) => {
  Object.keys(db).forEach(key => {
    localStorage.setItem(`sewpro_${key}`, JSON.stringify(db[key]));
  });
  window.dispatchEvent(new Event("sewpro_db_update"));
};

export const store = {
  getSettings: () => getDB().settings,
  updateSettings: (newSettings) => {
    const db = getDB();
    db.settings = { ...db.settings, ...newSettings };
    saveDB(db);
  },

  getProducts: () => getDB().products,
  addProduct: (product) => {
    const db = getDB();
    const newId = "p" + (db.products.length + 1);
    const newProduct = {
      ...product,
      id: newId,
      purchasePrice: parseFloat(product.purchasePrice) || 0,
      sellingPrice: parseFloat(product.sellingPrice) || 0,
      stock: parseInt(product.stock) || 0,
      minStock: parseInt(product.minStock) || 0,
      serials: product.serials || []
    };
    db.products.push(newProduct);
    saveDB(db);
    return newProduct;
  },
  updateProduct: (updated) => {
    const db = getDB();
    db.products = db.products.map(p => p.id === updated.id ? { ...p, ...updated } : p);
    saveDB(db);
  },

  getCustomers: () => getDB().customers,
  addCustomer: (cust) => {
    const db = getDB();
    const newId = "c" + (db.customers.length + 1);
    const newCustomer = {
      id: newId,
      name: cust.name,
      mobile: cust.mobile,
      address: cust.address || "",
      outstanding: parseFloat(cust.outstanding) || 0,
      ledger: cust.ledger || (parseFloat(cust.outstanding) > 0 ? [
        { date: new Date().toISOString().split("T")[0], description: "Opening Outstanding Balance", debit: parseFloat(cust.outstanding), credit: 0, balance: parseFloat(cust.outstanding) }
      ] : [])
    };
    db.customers.push(newCustomer);
    saveDB(db);
    return newCustomer;
  },
  receiveCustomerPayment: (customerId, amount, paymentMethod, note = "") => {
    const db = getDB();
    const customer = db.customers.find(c => c.id === customerId);
    if (customer) {
      const amt = parseFloat(amount);
      const prevOutstanding = customer.outstanding;
      customer.outstanding = Math.max(0, customer.outstanding - amt);
      customer.ledger.push({
        date: new Date().toISOString().split("T")[0],
        description: `Payment Received (${paymentMethod}) ${note ? `- ${note}` : ""}`,
        debit: 0,
        credit: amt,
        balance: customer.outstanding
      });
      // Log payment history if needed or just through ledger/invoice
      saveDB(db);
    }
  },

  getSuppliers: () => getDB().suppliers,
  addSupplier: (sup) => {
    const db = getDB();
    const newId = "s" + (db.suppliers.length + 1);
    const newSupplier = {
      id: newId,
      name: sup.name,
      mobile: sup.mobile,
      email: sup.email || "",
      address: sup.address || "",
      totalPurchases: 0,
      totalPaid: 0,
      outstanding: 0
    };
    db.suppliers.push(newSupplier);
    saveDB(db);
    return newSupplier;
  },
  paySupplier: (supplierId, amount, paymentMethod, note = "") => {
    const db = getDB();
    const supplier = db.suppliers.find(s => s.id === supplierId);
    if (supplier) {
      const amt = parseFloat(amount);
      supplier.totalPaid += amt;
      supplier.outstanding = Math.max(0, supplier.outstanding - amt);
      saveDB(db);
    }
  },

  getSales: () => getDB().sales,
  addSale: (sale) => {
    const db = getDB();
    const invoiceNum = db.settings.invoicePrefix + (db.settings.startingNumber + db.sales.length);
    
    const newSale = {
      ...sale,
      invoiceNumber: invoiceNum,
      date: new Date().toISOString().split("T")[0]
    };

    // Deduct stock and register warranties
    newSale.items.forEach(item => {
      const p = db.products.find(prod => prod.id === item.productId);
      if (p) {
        p.stock = Math.max(0, p.stock - parseInt(item.quantity));
        if (item.serialNumber && p.serials) {
          p.serials = p.serials.filter(s => s !== item.serialNumber);
        }
      }
      
      if (item.type === "Machine") {
        const warrantyEnd = new Date();
        warrantyEnd.setMonth(warrantyEnd.getMonth() + parseInt(db.settings.defaultWarrantyMonths));
        db.warranties.push({
          id: "w" + (db.warranties.length + 1),
          invoiceNumber: invoiceNum,
          customerName: newSale.customerName,
          productName: item.name,
          serialNumber: item.serialNumber || "N/A",
          warrantyMonths: db.settings.defaultWarrantyMonths,
          startDate: newSale.date,
          endDate: warrantyEnd.toISOString().split("T")[0],
          status: "Active"
        });
      }
    });

    // Update customer outstanding/udhaar
    let customer = db.customers.find(c => c.id === sale.customerId || c.mobile === sale.customerMobile);
    if (!customer) {
      // Create new customer
      customer = {
        id: "c" + (db.customers.length + 1),
        name: sale.customerName,
        mobile: sale.customerMobile,
        address: "",
        outstanding: 0,
        ledger: []
      };
      db.customers.push(customer);
    }

    if (newSale.due > 0) {
      customer.outstanding += newSale.due;
    }
    customer.ledger.push({
      date: newSale.date,
      description: `Invoice ${invoiceNum} generated`,
      debit: newSale.total,
      credit: newSale.paid,
      balance: customer.outstanding
    });

    db.sales.push(newSale);
    saveDB(db);
    return newSale;
  },

  processReturn: (invoiceNumber, productId, returnQty, reason, refundMethod) => {
    const db = getDB();
    const sale = db.sales.find(s => s.invoiceNumber === invoiceNumber);
    if (!sale) return false;

    const item = sale.items.find(i => i.productId === productId);
    if (!item) return false;

    // Return qty cannot exceed sold qty
    if (returnQty > item.quantity) return false;

    // Increase inventory
    const p = db.products.find(prod => prod.id === productId);
    if (p) {
      p.stock += returnQty;
    }

    // Deduct total & paid
    const pricePerItem = item.sellingPrice;
    const returnVal = pricePerItem * returnQty;

    // Deduct customer ledger if outstanding
    const customer = db.customers.find(c => c.id === sale.customerId);
    if (customer) {
      if (refundMethod === "Credit / Udhaar Adjustment") {
        customer.outstanding = Math.max(0, customer.outstanding - returnVal);
        customer.ledger.push({
          date: new Date().toISOString().split("T")[0],
          description: `Return Credit Adj: ${p ? p.name : "Product"} (Qty: ${returnQty})`,
          debit: 0,
          credit: returnVal,
          balance: customer.outstanding
        });
      } else {
        customer.ledger.push({
          date: new Date().toISOString().split("T")[0],
          description: `Returned Product & Refunded: ${p ? p.name : "Product"} (Qty: ${returnQty})`,
          debit: 0,
          credit: 0,
          balance: customer.outstanding
        });
      }
    }

    saveDB(db);
    return true;
  },

  getPurchases: () => getDB().purchases,
  addPurchase: (p) => {
    const db = getDB();
    const newPurchase = {
      ...p,
      date: p.date || new Date().toISOString().split("T")[0]
    };

    // Update product stock & price
    p.items.forEach(item => {
      const prod = db.products.find(pr => pr.id === item.productId);
      if (prod) {
        prod.stock += parseInt(item.quantity);
        prod.purchasePrice = parseFloat(item.purchasePrice);
      }
    });

    // Update supplier outstanding
    const supplier = db.suppliers.find(s => s.id === p.supplierId);
    if (supplier) {
      supplier.totalPurchases += p.total;
      supplier.totalPaid += p.paid;
      supplier.outstanding += p.due;
    }

    db.purchases.push(newPurchase);
    saveDB(db);
    return newPurchase;
  },

  getServices: () => getDB().services,
  addServiceJob: (job) => {
    const db = getDB();
    const jobId = db.settings.servicePrefix + (1001 + db.services.length);
    const newJob = {
      ...job,
      jobId,
      receivedDate: new Date().toISOString().split("T")[0],
      status: "Received",
      partsUsed: [],
      labourCharges: 0,
      totalAmount: db.settings.inspectionCharges || 150,
      paidAmount: 0,
      dueAmount: db.settings.inspectionCharges || 150,
      serviceNotes: ""
    };
    db.services.push(newJob);
    saveDB(db);
    return newJob;
  },
  updateServiceJob: (jobId, updatedFields) => {
    const db = getDB();
    const jobIndex = db.services.findIndex(j => j.jobId === jobId);
    if (jobIndex === -1) return;

    const oldJob = db.services[jobIndex];
    const newJob = { ...oldJob, ...updatedFields };

    // Calculate dues
    newJob.totalAmount = (newJob.partsUsed || []).reduce((acc, p) => acc + (p.sellingPrice * p.quantity), 0) + (newJob.labourCharges || 0);
    newJob.dueAmount = Math.max(0, newJob.totalAmount - (newJob.paidAmount || 0));

    // If marked delivered & completed, sync to customer outstanding/ledger if dueAmount > 0
    if (newJob.status === "Delivered" && oldJob.status !== "Delivered") {
      const customer = db.customers.find(c => c.id === newJob.customerId || c.mobile === newJob.customerMobile);
      if (customer) {
        if (newJob.dueAmount > 0) {
          customer.outstanding += newJob.dueAmount;
        }
        customer.ledger.push({
          date: new Date().toISOString().split("T")[0],
          description: `Service Job ${jobId} delivered`,
          debit: newJob.totalAmount,
          credit: newJob.paidAmount,
          balance: customer.outstanding
        });
      }
    }

    db.services[jobIndex] = newJob;
    saveDB(db);
  },

  usePartInService: (jobId, productId, qty) => {
    const db = getDB();
    const job = db.services.find(j => j.jobId === jobId);
    const prod = db.products.find(p => p.id === productId);

    if (job && prod && prod.stock >= qty) {
      prod.stock -= qty;
      
      const existingPartIndex = job.partsUsed.findIndex(p => p.id === productId);
      if (existingPartIndex > -1) {
        job.partsUsed[existingPartIndex].quantity += qty;
      } else {
        job.partsUsed.push({
          id: prod.id,
          name: prod.name,
          quantity: qty,
          sellingPrice: prod.sellingPrice
        });
      }

      job.totalAmount = job.partsUsed.reduce((acc, p) => acc + (p.sellingPrice * p.quantity), 0) + (job.labourCharges || 0);
      job.dueAmount = Math.max(0, job.totalAmount - (job.paidAmount || 0));

      saveDB(db);
      return true;
    }
    return false;
  },

  getExpenses: () => getDB().expenses,
  addExpense: (exp) => {
    const db = getDB();
    const newExp = {
      ...exp,
      id: "e" + (db.expenses.length + 1),
      date: exp.date || new Date().toISOString().split("T")[0]
    };
    db.expenses.push(newExp);
    saveDB(db);
    return newExp;
  },

  getWarranties: () => getDB().warranties,

  resetData: () => {
    localStorage.removeItem("sewpro_settings");
    localStorage.removeItem("sewpro_products");
    localStorage.removeItem("sewpro_customers");
    localStorage.removeItem("sewpro_suppliers");
    localStorage.removeItem("sewpro_sales");
    localStorage.removeItem("sewpro_purchases");
    localStorage.removeItem("sewpro_services");
    localStorage.removeItem("sewpro_expenses");
    localStorage.removeItem("sewpro_warranties");
    window.dispatchEvent(new Event("sewpro_db_update"));
  }
};
