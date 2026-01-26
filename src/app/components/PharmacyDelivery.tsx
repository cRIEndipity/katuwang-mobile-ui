import { useState } from 'react';
import { ChevronLeft, Pill, Search, ShoppingCart, MapPin, Clock, DollarSign, Plus, Minus, Trash2, CheckCircle, Truck } from 'lucide-react';

type Screen = 'pharmacy' | 'dashboard' | 'entry' | 'telemedicine' | 'health-records' | 'health-assistant' | 'emergency' | 'hospitals' | 'contacts';

interface PharmacyDeliveryProps {
  onNavigate: (screen: Screen) => void;
}

interface Medicine {
  id: string;
  name: string;
  strength: string;
  manufacturer: string;
  price: number;
  quantity: number;
  image: string;
  inStock: boolean;
  requiresPrescription: boolean;
  description: string;
}

interface CartItem {
  medicine: Medicine;
  quantity: number;
}

const medicines: Medicine[] = [
  {
    id: '1',
    name: 'Amoxicillin',
    strength: '500mg',
    manufacturer: 'Pfizer',
    price: 150,
    quantity: 50,
    image: '💊',
    inStock: true,
    requiresPrescription: true,
    description: 'Antibiotic for infections',
  },
  {
    id: '2',
    name: 'Ibuprofen',
    strength: '200mg',
    manufacturer: 'Bayer',
    price: 80,
    quantity: 100,
    image: '💊',
    inStock: true,
    requiresPrescription: false,
    description: 'Pain reliever and fever reducer',
  },
  {
    id: '3',
    name: 'Cetirizine',
    strength: '10mg',
    manufacturer: 'Sanofi',
    price: 200,
    quantity: 30,
    image: '💊',
    inStock: true,
    requiresPrescription: false,
    description: 'Antihistamine for allergies',
  },
  {
    id: '4',
    name: 'Metformin',
    strength: '500mg',
    manufacturer: 'Merck',
    price: 250,
    quantity: 40,
    image: '💊',
    inStock: true,
    requiresPrescription: true,
    description: 'Diabetes management',
  },
  {
    id: '5',
    name: 'Vitamin C',
    strength: '1000mg',
    manufacturer: 'Nutrivite',
    price: 120,
    quantity: 60,
    image: '💊',
    inStock: true,
    requiresPrescription: false,
    description: 'Immune system booster',
  },
];

const BRAND_COLORS = {
  primary: '#F7502F',      // Naga Coral
  secondary: '#1D62AF',    // Fun Blue
  success: '#00A651',      // Success Green
  background: '#FAFBFC',   // Athens Gray
  textDark: '#1A202C',
  textMid: '#4A5568',
  textLight: '#718096',
  border: '#E2E8F0',
};

export default function PharmacyDelivery({ onNavigate }: PharmacyDeliveryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('123 Main St, Naga City');
  const [prescriptionRequired, setPrescriptionRequired] = useState(false);

  const filteredMedicines = medicines.filter(med =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cartTotal = cart.reduce((sum, item) => sum + item.medicine.price * item.quantity, 0);

  const addToCart = (medicine: Medicine) => {
    const existingItem = cart.find(item => item.medicine.id === medicine.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.medicine.id === medicine.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { medicine, quantity: 1 }]);
    }
  };

  const removeFromCart = (medicineId: string) => {
    setCart(cart.filter(item => item.medicine.id !== medicineId));
  };

  const updateQuantity = (medicineId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(medicineId);
    } else {
      setCart(cart.map(item =>
        item.medicine.id === medicineId
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const handleCheckout = () => {
    const hasRx = cart.some(item => item.medicine.requiresPrescription);
    if (hasRx) {
      setPrescriptionRequired(true);
    } else {
      setOrderConfirmed(true);
      setTimeout(() => {
        setOrderConfirmed(false);
        setShowCheckout(false);
        setShowCart(false);
        setCart([]);
        setPrescriptionRequired(false);
      }, 2000);
    }
  };

  const handleUploadPrescription = () => {
    // Simulate prescription upload - in real app, this would upload to server
    setPrescriptionRequired(false);
  };

  const handleProceedWithPrescription = () => {
    setOrderConfirmed(true);
    setTimeout(() => {
      setOrderConfirmed(false);
      setShowCheckout(false);
      setShowCart(false);
      setCart([]);
      setPrescriptionRequired(false);
    }, 2500);
  };

  if (orderConfirmed) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: BRAND_COLORS.background }}>
        <div className="text-center px-6">
          <div className="bg-white rounded-3xl p-8 shadow-2xl mx-auto w-full max-w-sm">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 rounded-full p-4">
                <CheckCircle className="w-12 h-12" style={{ color: BRAND_COLORS.success }} />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
            <p className="text-gray-600 mb-4">
              Your medicines will be delivered to {deliveryAddress}
            </p>
            <div className="bg-blue-50 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 text-blue-700 font-semibold mb-2">
                <Truck className="w-5 h-5" />
                Estimated Delivery
              </div>
              <p className="text-gray-700">2-4 hours</p>
            </div>
            <button
              onClick={() => onNavigate('dashboard')}
              className="w-full py-3 rounded-xl text-white font-semibold transition-all"
              style={{ backgroundColor: BRAND_COLORS.secondary }}
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: BRAND_COLORS.background }}>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="p-6 flex items-center justify-between">
          <div>
            <button
              onClick={() => {
                if (showCart) setShowCart(false);
                else if (showCheckout) setShowCheckout(false);
                else onNavigate('dashboard');
              }}
              className="flex items-center gap-2 mb-2"
              style={{ color: BRAND_COLORS.secondary }}
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="font-semibold">Back</span>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Pharmacy Delivery</h1>
          </div>
          {cart.length > 0 && !showCart && (
            <button
              onClick={() => setShowCart(true)}
              className="relative"
            >
              <ShoppingCart className="w-6 h-6" style={{ color: BRAND_COLORS.primary }} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            </button>
          )}
        </div>
      </div>

      <div className="p-6 pb-20">
        {!showCart ? (
          !showCheckout ? (
            <>
              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search medicines..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Medicines List */}
              <div className="space-y-4">
                {filteredMedicines.map((medicine) => (
                  <div key={medicine.id} className="bg-white rounded-2xl shadow-md p-5">
                    <div className="flex gap-4 mb-4">
                      <div className="text-4xl">{medicine.image}</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold text-gray-900">{medicine.name}</h3>
                            <p className="text-sm text-gray-600">{medicine.strength} • {medicine.manufacturer}</p>
                          </div>
                          {medicine.requiresPrescription && (
                            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">Rx</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{medicine.description}</p>
                        <div className="text-lg font-bold" style={{ color: BRAND_COLORS.primary }}>
                          ₱{medicine.price}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => addToCart(medicine)}
                      disabled={!medicine.inStock}
                      className="w-full py-2 rounded-lg text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ backgroundColor: BRAND_COLORS.secondary }}
                    >
                      <ShoppingCart className="w-4 h-4 inline mr-2" />
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Checkout Screen */
            <div className="space-y-6">
              <button
                onClick={() => setShowCheckout(false)}
                className="flex items-center gap-2"
                style={{ color: BRAND_COLORS.secondary }}
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="font-semibold">Back to Cart</span>
              </button>

              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Delivery Address</h2>
                <div className="bg-blue-50 rounded-xl p-4 flex gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">{deliveryAddress}</p>
                    <button className="text-sm text-blue-600 hover:underline mt-1">Change Address</button>
                  </div>
                </div>
              </div>

              {prescriptionRequired && (
                <div className="bg-orange-50 rounded-2xl shadow-md p-6">
                  <p className="text-sm text-orange-700 mb-4">
                    ⚠️ Some items require a prescription. Please upload your prescription to proceed.
                  </p>
                  <div className="space-y-3">
                    <button 
                      onClick={handleUploadPrescription}
                      className="w-full py-3 rounded-lg border-2 font-semibold transition-all"
                      style={{ borderColor: BRAND_COLORS.primary, color: BRAND_COLORS.primary }}
                    >
                      Upload Prescription
                    </button>
                    <button 
                      onClick={() => setPrescriptionRequired(false)}
                      className="w-full py-2 text-sm text-orange-600 hover:text-orange-700"
                    >
                      Continue Without Upload
                    </button>
                  </div>
                </div>
              )}

              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
                <div className="space-y-3 mb-4">
                  {cart.map((item) => (
                    <div key={item.medicine.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.medicine.name} x{item.quantity}</span>
                      <span className="font-semibold text-gray-900">₱{item.medicine.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">₱{cartTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-semibold">₱50</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold" style={{ color: BRAND_COLORS.primary }}>
                      ₱{cartTotal + 50}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleProceedWithPrescription}
                disabled={prescriptionRequired}
                className="w-full py-4 rounded-xl text-white font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: BRAND_COLORS.secondary }}
              >
                {prescriptionRequired ? 'Upload Prescription First' : 'Place Order'}
              </button>
            </div>
          )
        ) : (
          /* Cart View */
          <div className="space-y-6">
            <button
              onClick={() => setShowCart(false)}
              className="flex items-center gap-2"
              style={{ color: BRAND_COLORS.secondary }}
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="font-semibold">Continue Shopping</span>
            </button>

            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.medicine.id} className="bg-white rounded-2xl shadow-md p-5">
                  <div className="flex gap-4 mb-4">
                    <div className="text-4xl">{item.medicine.image}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{item.medicine.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{item.medicine.strength}</p>
                      <div className="text-lg font-bold" style={{ color: BRAND_COLORS.primary }}>
                        ₱{item.medicine.price}
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.medicine.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 bg-gray-100 rounded-lg w-fit">
                    <button
                      onClick={() => updateQuantity(item.medicine.id, item.quantity - 1)}
                      className="p-2 hover:bg-gray-200 rounded"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.medicine.id, item.quantity + 1)}
                      className="p-2 hover:bg-gray-200 rounded"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 fixed bottom-0 left-0 right-0 mx-auto max-w-md">
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₱{cartTotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span>₱50</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span style={{ color: BRAND_COLORS.primary }}>₱{cartTotal + 50}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  const hasRx = cart.some(item => item.medicine.requiresPrescription);
                  if (hasRx) {
                    setPrescriptionRequired(true);
                  }
                  setShowCheckout(true);
                }}
                className="w-full py-4 rounded-xl text-white font-bold transition-all"
                style={{ backgroundColor: BRAND_COLORS.secondary }}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
