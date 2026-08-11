import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  LuSearch,
  LuPlus,
  LuPackage,
  LuTriangleAlert,
  LuTrendingUp,
  LuChevronRight,
  LuArrowLeft,
  LuBarcode,
  LuUsers,
  LuHistory,
  LuDollarSign,
  LuCornerUpLeft,
  LuFileText
} from 'react-icons/lu';
import { store } from '../utils/store';

const Inventory = ({ subpage }) => {
  const navigate = useNavigate();
  const { id: paramId } = useParams();

  const [products, setProducts] = useState(store.getProducts());
  const [suppliers, setSuppliers] = useState(store.getSuppliers());
  const [purchases, setPurchases] = useState(store.getPurchases());
  const [settings, setSettings] = useState(store.getSettings());
  const [sales, setSales] = useState(store.getSales());
  const [services, setServices] = useState(store.getServices());

  useEffect(() => {
    const handleUpdate = () => {
      setProducts(store.getProducts());
      setSuppliers(store.getSuppliers());
      setPurchases(store.getPurchases());
      setSettings(store.getSettings());
      setSales(store.getSales());
      setServices(store.getServices());
    };
    window.addEventListener('sewpro_db_update', handleUpdate);
    return () => window.removeEventListener('sewpro_db_update', handleUpdate);
  }, []);

  const cur = settings.currency || '₹';

  // Filters for Product Listing
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterLowStock, setFilterLowStock] = useState(false);

  // New Product Modal State
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdType, setNewProdType] = useState('Machine');
  const [newProdBrand, setNewProdBrand] = useState('');
  const [newProdModel, setNewProdModel] = useState('');
  const [newProdPurchasePrice, setNewProdPurchasePrice] = useState('');
  const [newProdSellingPrice, setNewProdSellingPrice] = useState('');
  const [newProdStock, setNewProdStock] = useState('');
  const [newProdMinStock, setNewProdMinStock] = useState('5');
  const [newProdSerialsText, setNewProdSerialsText] = useState('');

  // New Purchase Fields State
  const [purchaseSupplierId, setPurchaseSupplierId] = useState('');
  const [purchaseInvoiceNo, setPurchaseInvoiceNo] = useState('');
  const [purchaseProductId, setPurchaseProductId] = useState('');
  const [purchaseQty, setPurchaseQty] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [purchaseGst, setPurchaseGst] = useState('18');
  const [purchaseDiscount, setPurchaseDiscount] = useState('0');
  const [purchasePaid, setPurchasePaid] = useState('');

  // New Supplier Form
  const [showAddSupplierModal, setShowAddSupplierModal] = useState(false);
  const [newSupName, setNewSupName] = useState('');
  const [newSupMobile, setNewSupMobile] = useState('');
  const [newSupEmail, setNewSupEmail] = useState('');
  const [newSupAddress, setNewSupAddress] = useState('');

  // Calculated Inventory KPI stats
  const totalProductsCount = products.length;
  const lowStockProductsCount = products.filter(p => p.stock > 0 && p.stock <= p.minStock).length;
  const outOfStockProductsCount = products.filter(p => p.stock === 0).length;
  const totalStockValue = products.reduce((acc, p) => acc + (p.purchasePrice * p.stock), 0);

  // Filter Products list
  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase()) || p.model.toLowerCase().includes(searchQuery.toLowerCase());
    const matchBrand = filterBrand ? p.brand === filterBrand : true;
    const matchType = filterType ? p.type === filterType : true;
    const matchLow = filterLowStock ? p.stock <= p.minStock : true;
    return matchSearch && matchBrand && matchType && matchLow;
  });

  // Extract unique brands
  const brands = [...new Set(products.map(p => p.brand))];

  // Handlers
  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (!newProdName || !newProdBrand || !newProdModel) return;

    // Parse serials
    const serialsList = newProdSerialsText
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    store.addProduct({
      name: newProdName,
      type: newProdType,
      brand: newProdBrand,
      model: newProdModel,
      purchasePrice: parseFloat(newProdPurchasePrice) || 0,
      sellingPrice: parseFloat(newProdSellingPrice) || 0,
      stock: parseInt(newProdStock) || 0,
      minStock: parseInt(newProdMinStock) || 5,
      serials: serialsList
    });

    // Reset fields
    setNewProdName('');
    setNewProdBrand('');
    setNewProdModel('');
    setNewProdPurchasePrice('');
    setNewProdSellingPrice('');
    setNewProdStock('');
    setNewProdMinStock('5');
    setNewProdSerialsText('');
    setShowAddProductModal(false);
  };

  const handleAddPurchaseSubmit = (e) => {
    e.preventDefault();
    if (!purchaseSupplierId || !purchaseInvoiceNo || !purchaseProductId || !purchaseQty || !purchasePrice) {
      alert("Please fill in all required fields.");
      return;
    }

    const supplier = suppliers.find(s => s.id === purchaseSupplierId);
    const product = products.find(p => p.id === purchaseProductId);
    if (!supplier || !product) return;

    const qty = parseInt(purchaseQty);
    const price = parseFloat(purchasePrice);
    const gstRate = parseFloat(purchaseGst) || 18;
    const disc = parseFloat(purchaseDiscount) || 0;
    const paid = parseFloat(purchasePaid) || 0;

    const subtotal = qty * price;
    const gstAmt = (subtotal * gstRate) / 100;
    const totalVal = subtotal + gstAmt - disc;
    const dueVal = Math.max(0, totalVal - paid);

    store.addPurchase({
      purchaseInvoiceNumber: purchaseInvoiceNo,
      supplierId: purchaseSupplierId,
      supplierName: supplier.name,
      items: [{ productId: purchaseProductId, name: product.name, quantity: qty, purchasePrice: price }],
      gst: gstAmt,
      discount: disc,
      total: totalVal,
      paid,
      due: dueVal
    });

    alert("Purchase order submitted successfully. Product stock increased.");
    // Reset fields
    setPurchaseSupplierId('');
    setPurchaseInvoiceNo('');
    setPurchaseProductId('');
    setPurchaseQty('');
    setPurchasePrice('');
    setPurchasePaid('');
  };

  const handleAddSupplierSubmit = (e) => {
    e.preventDefault();
    if (!newSupName || !newSupMobile) return;

    store.addSupplier({
      name: newSupName,
      mobile: newSupMobile,
      email: newSupEmail,
      address: newSupAddress
    });

    setNewSupName('');
    setNewSupMobile('');
    setNewSupEmail('');
    setNewSupAddress('');
    setShowAddSupplierModal(false);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto animate-in fade-in duration-500 pb-12">
      {/* Subpage Header Tab links */}
      <div className="flex border-b border-slate-200 mb-8">
        <button
          onClick={() => navigate('/admin/inventory/products')}
          className={`px-6 py-3 font-semibold text-sm border-b-2 transition-all ${
            subpage === 'products' || subpage === 'product-details' ? 'border-[#1e2b4d] text-[#1e2b4d]' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Products Stock List
        </button>
        <button
          onClick={() => navigate('/admin/inventory/purchases')}
          className={`px-6 py-3 font-semibold text-sm border-b-2 transition-all ${
            subpage === 'purchases' ? 'border-[#1e2b4d] text-[#1e2b4d]' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Purchases (Stock In)
        </button>
        <button
          onClick={() => navigate('/admin/inventory/suppliers')}
          className={`px-6 py-3 font-semibold text-sm border-b-2 transition-all ${
            subpage === 'suppliers' || subpage === 'supplier-details' ? 'border-[#1e2b4d] text-[#1e2b4d]' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Suppliers Management
        </button>
      </div>

      {/* PAGE 5 — PRODUCTS LISTING */}
      {subpage === 'products' && (
        <>
          {/* Top Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/60">
              <div className="flex items-center gap-3 mb-2">
                <LuPackage className="text-slate-400" size={20} />
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Products</span>
              </div>
              <h3 className="text-2xl font-bold text-[#1e2b4d]">{totalProductsCount}</h3>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/60">
              <div className="flex items-center gap-3 mb-2">
                <LuTriangleAlert className="text-amber-500" size={20} />
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Low Stock Items</span>
              </div>
              <h3 className="text-2xl font-bold text-amber-600">{lowStockProductsCount}</h3>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/60">
              <div className="flex items-center gap-3 mb-2">
                <LuTriangleAlert className="text-rose-500" size={20} />
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Out of Stock</span>
              </div>
              <h3 className="text-2xl font-bold text-rose-600">{outOfStockProductsCount}</h3>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/60">
              <div className="flex items-center gap-3 mb-2">
                <LuTrendingUp className="text-emerald-500" size={20} />
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Stock Valuation</span>
              </div>
              <h3 className="text-2xl font-bold text-emerald-600">{cur}{totalStockValue.toLocaleString()}</h3>
            </div>
          </div>

          {/* Master Table and Search */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden">
            <div className="p-5 border-b border-slate-200/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2 flex-1 items-center">
                <div className="relative w-full sm:w-[220px]">
                  <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                  <input
                    type="text"
                    placeholder="Search product..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
                  />
                </div>

                <select
                  value={filterBrand}
                  onChange={(e) => setFilterBrand(e.target.value)}
                  className="px-3 py-2 border border-slate-200 rounded-md text-[13px] bg-white focus:outline-none"
                >
                  <option value="">All Brands</option>
                  {brands.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>

                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-slate-200 rounded-md text-[13px] bg-white focus:outline-none"
                >
                  <option value="">All Types</option>
                  <option value="Machine">Machine</option>
                  <option value="Spare Part">Spare Part</option>
                  <option value="Accessory">Accessory</option>
                  <option value="Consumable">Consumable</option>
                </select>

                <label className="flex items-center gap-1.5 text-xs text-slate-600 select-none">
                  <input
                    type="checkbox"
                    checked={filterLowStock}
                    onChange={(e) => setFilterLowStock(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  Low Stock only
                </label>
              </div>

              <button
                onClick={() => setShowAddProductModal(true)}
                className="bg-[#0b1c3c] hover:bg-[#1e2b4d] text-white text-[13px] font-semibold px-4 py-2 rounded-md flex items-center gap-1.5 transition-colors shrink-0"
              >
                <LuPlus size={16} /> Add Product
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="px-6 py-4">Product Name</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Brand</th>
                    <th className="px-6 py-4">Model</th>
                    <th className="px-6 py-4 text-right">Purchase Price</th>
                    <th className="px-6 py-4 text-right">Selling Price</th>
                    <th className="px-6 py-4 text-right">Stock Qty</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="text-[13px]">
                  {filteredProducts.map((prod) => {
                    const isLow = prod.stock <= prod.minStock;
                    return (
                      <tr key={prod.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-[#1e2b4d]">{prod.name}</td>
                        <td className="px-6 py-4 text-slate-500">{prod.type}</td>
                        <td className="px-6 py-4 text-slate-600">{prod.brand}</td>
                        <td className="px-6 py-4 text-slate-600">{prod.model}</td>
                        <td className="px-6 py-4 text-right text-slate-700">{cur}{prod.purchasePrice.toLocaleString()}</td>
                        <td className="px-6 py-4 text-right font-bold text-[#1e2b4d]">{cur}{prod.sellingPrice.toLocaleString()}</td>
                        <td className="px-6 py-4 text-right font-bold">
                          <span className={isLow ? 'text-rose-600' : 'text-slate-700'}>{prod.stock}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            prod.stock === 0 ? 'bg-rose-50 text-rose-700' :
                            isLow ? 'bg-amber-50 text-amber-700' :
                            'bg-emerald-50 text-emerald-700'
                          }`}>
                            {prod.stock === 0 ? 'Out of Stock' : isLow ? 'Low Stock' : 'In Stock'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => navigate(`/admin/inventory/product/${prod.id}`)}
                            className="text-blue-600 hover:underline font-bold text-xs"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* PAGE 6 — PRODUCT DETAILS */}
      {subpage === 'product-details' && (() => {
        const prod = products.find(p => p.id === paramId);
        if (!prod) return <p className="text-slate-500">Product not found.</p>;

        const pSales = sales.filter(s => s.items.some(it => it.productId === prod.id));
        const pServices = services.filter(j => j.partsUsed.some(pu => pu.id === prod.id));

        return (
          <div className="space-y-6">
            <button
              onClick={() => navigate('/admin/inventory/products')}
              className="flex items-center gap-1.5 text-xs text-[#1e2b4d] font-bold hover:underline mb-4"
            >
              <LuArrowLeft size={16} /> Back to Products Stock
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Product Profile info */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200/60 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#dae5f5] text-[#1e2b4d] rounded-lg flex items-center justify-center font-black text-lg">
                    {prod.type[0]}
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-[#1e2b4d]">{prod.name}</h2>
                    <span className="text-[11px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold uppercase">{prod.type}</span>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 space-y-3 text-xs">
                  <div>
                    <p className="text-slate-400">Brand & Model</p>
                    <p className="font-bold text-[#1e2b4d]">{prod.brand} &bull; {prod.model}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Stock Status</p>
                    <p className="font-bold text-[#1e2b4d]">{prod.stock} Units available (Min limit: {prod.minStock})</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Purchase Price</p>
                    <p className="font-bold text-slate-700">{cur}{prod.purchasePrice}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Selling Price</p>
                    <p className="font-bold text-emerald-600 text-sm">{cur}{prod.sellingPrice}</p>
                  </div>
                </div>
              </div>

              {/* Serial Numbers Tracking for Machines */}
              <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-slate-200/60">
                <h3 className="text-[15px] font-bold text-[#1e2b4d] mb-4">Tracking & Lifecycle Details</h3>
                
                {prod.type === 'Machine' ? (
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Unique Serial Numbers Available ({prod.serials.length})</p>
                      <div className="flex flex-wrap gap-2">
                        {prod.serials.map(s => (
                          <span key={s} className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded text-xs font-bold border border-emerald-200 flex items-center gap-1">
                            <LuBarcode size={13} /> {s}
                          </span>
                        ))}
                        {prod.serials.length === 0 && (
                          <span className="text-slate-400 text-xs italic">No serials in stock (all sold or in service)</span>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-4 text-xs space-y-2">
                      <p className="font-bold text-slate-600">Product Documents & Warranty Manuals</p>
                      <ul className="space-y-1.5 text-blue-600 font-medium">
                        <li className="flex items-center gap-1.5 hover:underline cursor-pointer"><LuFileText size={14} /> Owner_Manual_English.pdf</li>
                        <li className="flex items-center gap-1.5 hover:underline cursor-pointer"><LuFileText size={14} /> Warranty_T&C_Sticker.pdf</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-400 text-xs italic py-6">Unique Serial Tracking and warranty docs are only applicable for Machines.</p>
                )}
              </div>
            </div>

            {/* History Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-5">
              <h3 className="text-[15px] font-bold text-[#1e2b4d] mb-4">Stock Movement History</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Sales Invoices containing this item</h4>
                  <ul className="space-y-2 text-xs">
                    {pSales.map(s => (
                      <li key={s.invoiceNumber} className="flex justify-between border-b border-slate-50 pb-1.5">
                        <span>Invoice {s.invoiceNumber} ({s.date})</span>
                        <span className="font-bold">{s.customerName}</span>
                      </li>
                    ))}
                    {pSales.length === 0 && (
                      <li className="text-slate-400 italic">No sales logs found.</li>
                    )}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Service job uses</h4>
                  <ul className="space-y-2 text-xs">
                    {pServices.map(j => (
                      <li key={j.jobId} className="flex justify-between border-b border-slate-50 pb-1.5">
                        <span>Job {j.jobId} ({j.receivedDate})</span>
                        <span className="font-bold text-rose-600">Qty used</span>
                      </li>
                    ))}
                    {pServices.length === 0 && (
                      <li className="text-slate-400 italic">No service logs found.</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* PAGE 7 — PURCHASES (STOCK IN) */}
      {subpage === 'purchases' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Purchase Log Form */}
          <form onSubmit={handleAddPurchaseSubmit} className="lg:col-span-1 bg-white rounded-xl p-5 shadow-sm border border-slate-200/60 space-y-4">
            <h3 className="text-[15px] font-bold text-[#1e2b4d] mb-2">Log New Stock Purchase</h3>
            
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Select Supplier *</label>
              <select
                required
                value={purchaseSupplierId}
                onChange={(e) => setPurchaseSupplierId(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] bg-white focus:outline-none"
              >
                <option value="">-- Choose Supplier --</option>
                {suppliers.map(s => (
                  <option key={s.id} value={s.id}>{s.name} (Outstanding: {cur}{s.outstanding})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Purchase Invoice Number *</label>
              <input
                type="text"
                required
                placeholder="Supplier Invoice No..."
                value={purchaseInvoiceNo}
                onChange={(e) => setPurchaseInvoiceNo(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Select Product *</label>
              <select
                required
                value={purchaseProductId}
                onChange={(e) => setPurchaseProductId(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] bg-white focus:outline-none"
              >
                <option value="">-- Choose Product --</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>[{p.type}] {p.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Quantity *</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={purchaseQty}
                  onChange={(e) => setPurchaseQty(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Cost Price ({cur}) *</label>
                <input
                  type="number"
                  required
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">GST %</label>
                <input
                  type="number"
                  value={purchaseGst}
                  onChange={(e) => setPurchaseGst(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Discount</label>
                <input
                  type="number"
                  value={purchaseDiscount}
                  onChange={(e) => setPurchaseDiscount(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Paid Amount ({cur})</label>
              <input
                type="number"
                placeholder="Amount Paid..."
                value={purchasePaid}
                onChange={(e) => setPurchasePaid(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#0b1c3c] hover:bg-[#1e2b4d] text-white font-bold text-[13px] rounded-md transition-colors"
            >
              Log Purchase & Update Stock
            </button>
          </form>

          {/* Purchases History */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden">
            <div className="p-5 border-b border-slate-200/60">
              <h3 className="text-[15px] font-bold text-[#1e2b4d]">Purchase History Log</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="px-4 py-3">Invoice No</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Supplier</th>
                    <th className="px-4 py-3 text-right">Total</th>
                    <th className="px-4 py-3 text-right">Paid</th>
                    <th className="px-4 py-3 text-right">Due</th>
                  </tr>
                </thead>
                <tbody className="text-[13px]">
                  {purchases.map((p, idx) => (
                    <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="px-4 py-3.5 font-bold text-[#1e2b4d]">{p.purchaseInvoiceNumber}</td>
                      <td className="px-4 py-3.5 text-slate-500">{p.date}</td>
                      <td className="px-4 py-3.5 text-slate-600 font-bold">{p.supplierName}</td>
                      <td className="px-4 py-3.5 text-right font-bold text-[#1e2b4d]">{cur}{p.total.toLocaleString()}</td>
                      <td className="px-4 py-3.5 text-right text-emerald-600 font-bold">{cur}{p.paid.toLocaleString()}</td>
                      <td className="px-4 py-3.5 text-right text-rose-600 font-bold">{cur}{p.due.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* PAGE 8 — SUPPLIERS */}
      {subpage === 'suppliers' && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden">
          <div className="p-5 border-b border-slate-200/60 flex items-center justify-between">
            <h3 className="text-[15px] font-bold text-[#1e2b4d]">Suppliers List</h3>
            <button
              onClick={() => setShowAddSupplierModal(true)}
              className="bg-[#0b1c3c] hover:bg-[#1e2b4d] text-white text-[13px] font-bold px-4 py-2 rounded-md flex items-center gap-1.5 transition-colors"
            >
              <LuPlus size={16} /> Add Supplier
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="px-6 py-4">Supplier Name</th>
                  <th className="px-6 py-4">Mobile</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Address</th>
                  <th className="px-6 py-4 text-right">Total Purchases</th>
                  <th className="px-6 py-4 text-right">Total Paid</th>
                  <th className="px-6 py-4 text-right">Outstanding (Payable)</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-[13px]">
                {suppliers.map((s) => (
                  <tr key={s.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-bold text-[#1e2b4d]">{s.name}</td>
                    <td className="px-6 py-4 text-slate-600">{s.mobile}</td>
                    <td className="px-6 py-4 text-slate-500">{s.email || 'N/A'}</td>
                    <td className="px-6 py-4 text-slate-500">{s.address || 'N/A'}</td>
                    <td className="px-6 py-4 text-right text-slate-600">{cur}{s.totalPurchases.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right text-emerald-600 font-bold">{cur}{s.totalPaid.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right text-rose-600 font-bold">{cur}{s.outstanding.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => navigate(`/admin/inventory/supplier/${s.id}`)}
                        className="text-blue-600 hover:underline font-bold text-xs"
                      >
                        Details / Ledger
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUPPLIER DETAILS SUBPAGE */}
      {subpage === 'supplier-details' && (() => {
        const sup = suppliers.find(s => s.id === paramId);
        if (!sup) return <p className="text-slate-500">Supplier not found.</p>;

        const sPurchases = purchases.filter(p => p.supplierId === sup.id);

        return (
          <div className="space-y-6">
            <button
              onClick={() => navigate('/admin/inventory/suppliers')}
              className="flex items-center gap-1.5 text-xs text-[#1e2b4d] font-bold hover:underline mb-4"
            >
              <LuArrowLeft size={16} /> Back to Suppliers
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Supplier Info */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200/60 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center font-bold">
                    <LuUsers size={20} />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-[#1e2b4d]">{sup.name}</h2>
                    <p className="text-xs text-slate-400">{sup.mobile}</p>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 space-y-3 text-xs">
                  <div>
                    <p className="text-slate-400">Email Address</p>
                    <p className="font-bold text-[#1e2b4d]">{sup.email || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Postal Address</p>
                    <p className="font-medium text-slate-600">{sup.address || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Total Outstanding Payable</p>
                    <p className="font-bold text-rose-600 text-base">{cur}{sup.outstanding.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Purchase History list */}
              <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-slate-200/60 overflow-hidden">
                <h3 className="text-[15px] font-bold text-[#1e2b4d] mb-4">Stock Supplied & Purchase Timeline</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200/60 font-bold text-slate-400 uppercase">
                        <th className="px-4 py-2">Invoice No</th>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2 text-right">Total</th>
                        <th className="px-4 py-2 text-right">Paid</th>
                        <th className="px-4 py-2 text-right">Due</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sPurchases.map((p, idx) => (
                        <tr key={idx} className="border-b border-slate-100">
                          <td className="px-4 py-2.5 font-bold text-[#1e2b4d]">{p.purchaseInvoiceNumber}</td>
                          <td className="px-4 py-2.5 text-slate-500">{p.date}</td>
                          <td className="px-4 py-2.5 text-right font-bold">{cur}{p.total}</td>
                          <td className="px-4 py-2.5 text-right text-emerald-600">{cur}{p.paid}</td>
                          <td className="px-4 py-2.5 text-right text-rose-600 font-bold">{cur}{p.due}</td>
                        </tr>
                      ))}
                      {sPurchases.length === 0 && (
                        <tr>
                          <td colSpan="5" className="text-center py-4 text-slate-400 italic">No purchases recorded.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-slate-900/40 z-50 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleAddProductSubmit} className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-[500px] w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <h3 className="text-[16px] font-bold text-[#1e2b4d] mb-4">Add New Product</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Usha Janome Dream Stitch"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Product Type</label>
                  <select
                    value={newProdType}
                    onChange={(e) => setNewProdType(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] bg-white focus:outline-none"
                  >
                    <option value="Machine">Machine</option>
                    <option value="Spare Part">Spare Part</option>
                    <option value="Accessory">Accessory</option>
                    <option value="Consumable">Consumable</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Brand Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Usha"
                    value={newProdBrand}
                    onChange={(e) => setNewProdBrand(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Model Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dream Stitch"
                    value={newProdModel}
                    onChange={(e) => setNewProdModel(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Min Alert Stock Level</label>
                  <input
                    type="number"
                    value={newProdMinStock}
                    onChange={(e) => setNewProdMinStock(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Purchase Price *</label>
                  <input
                    type="number"
                    required
                    value={newProdPurchasePrice}
                    onChange={(e) => setNewProdPurchasePrice(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Selling Price *</label>
                  <input
                    type="number"
                    required
                    value={newProdSellingPrice}
                    onChange={(e) => setNewProdSellingPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Initial Stock *</label>
                  <input
                    type="number"
                    required
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
                  />
                </div>
              </div>

              {newProdType === 'Machine' && (
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Serial Numbers (Comma separated)</label>
                  <textarea
                    rows="2"
                    placeholder="e.g. UJDS-101, UJDS-102, UJDS-103"
                    value={newProdSerialsText}
                    onChange={(e) => setNewProdSerialsText(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={() => setShowAddProductModal(false)}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#0b1c3c] hover:bg-[#1e2b4d] text-white text-xs font-bold rounded"
              >
                Create Product
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add Supplier Modal */}
      {showAddSupplierModal && (
        <div className="fixed inset-0 bg-slate-900/40 z-50 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleAddSupplierSubmit} className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-[450px] w-full p-6 relative">
            <h3 className="text-[16px] font-bold text-[#1e2b4d] mb-4">Add New Supplier</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Supplier Name *</label>
                <input
                  type="text"
                  required
                  value={newSupName}
                  onChange={(e) => setNewSupName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Mobile / Phone Number *</label>
                <input
                  type="text"
                  required
                  value={newSupMobile}
                  onChange={(e) => setNewSupMobile(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Email Address</label>
                <input
                  type="email"
                  value={newSupEmail}
                  onChange={(e) => setNewSupEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Supplier Address</label>
                <input
                  type="text"
                  value={newSupAddress}
                  onChange={(e) => setNewSupAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13px] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={() => setShowAddSupplierModal(false)}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#0b1c3c] hover:bg-[#1e2b4d] text-white text-xs font-bold rounded"
              >
                Create Supplier
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Inventory;
