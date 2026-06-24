import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const savedLanguage = localStorage.getItem("language") || "en";

const resources = {
  en: {
    translation: {
      brand: "Foodie",

      nav: {
        menu: "Menu",
        trackOrder: "Track Order",
        cart: "Cart",
        login: "Login",
        logout: "Logout",
      },

      common: {
        loading: "Loading...",
        error: "Something went wrong.",
        unavailable: "Unavailable",
        currency: "EGP",
      },

      menu: {
        addToCart: "Add to Cart",
      },

      cart: {
        title: "Your Cart",
        empty: "Your cart is empty",
        emptyDescription: "Add some delicious meals from the menu.",
        browseMenu: "Browse Menu",
        clear: "Clear Cart",
        itemsCount: "{{count}} items",
        items: "Items",
        subtotal: "Subtotal",
        total: "Total",
        orderSummary: "Order Summary",
        checkout: "Proceed to Checkout",
      },

      trackOrder: {
        title: "Track your order",
        description: "Enter your order ID to check the latest status.",
        orderId: "Order ID",
        action: "Track",
        loading: "Loading order...",
        notFound: "No order found with this ID.",
        customer: "Customer",
        order: "Order",
      },

      orderStatus: {
        pending: "Pending",
        preparing: "Preparing",
        out_for_delivery: "Out for delivery",
        delivered: "Delivered",
      },
      checkout: {
        title: "Checkout",
        deliveryDetails: "Delivery Details",
        fullName: "Full Name",
        fullNamePlaceholder: "Ahmed Mohamed",
        phoneNumber: "Phone Number",
        phonePlaceholder: "01012345678",
        address: "Address",
        addressPlaceholder: "Street, building, apartment, city",
        paymentMethod: "Payment Method",
        cash: "Cash",
        online: "Online",
        orderSummary: "Order Summary",
        items: "Items",
        total: "Total",
        placeOrder: "Place Order",
        backToMenu: "Back to Menu",
      },

      orderSteps: {
        pending: {
          title: "Order received",
          description: "We received your order successfully.",
        },
        preparing: {
          title: "Preparing",
          description: "Your meal is being prepared now.",
        },
        out_for_delivery: {
          title: "Out for delivery",
          description: "Your order is on the way.",
        },
        delivered: {
          title: "Delivered",
          description: "Enjoy your meal.",
        },
      },

      admin: {
        dashboard: "Dashboard",
        products: "Products",
        orders: "Orders",
      },
    },
  },

  ar: {
    translation: {
      brand: "فودي",

      nav: {
        menu: "القائمة",
        trackOrder: "تتبع الطلب",
        cart: "السلة",
        login: "تسجيل الدخول",
        logout: "تسجيل الخروج",
      },

      common: {
        loading: "جارٍ التحميل...",
        error: "حدث خطأ ما.",
        unavailable: "غير متاح",
        currency: "جنيه",
      },

      menu: {
        addToCart: "أضف إلى السلة",
      },

      cart: {
        title: "سلة الطلبات",
        empty: "السلة فارغة",
        emptyDescription: "أضف بعض الوجبات اللذيذة من القائمة.",
        browseMenu: "تصفح القائمة",
        clear: "تفريغ السلة",
        itemsCount: "{{count}} منتجات",
        items: "العدد",
        subtotal: "المجموع الفرعي",
        total: "الإجمالي",
        orderSummary: "ملخص الطلب",
        checkout: "إتمام الطلب",
      },

      trackOrder: {
        title: "تتبع الطلب",
        description: "أدخل رقم الطلب لمعرفة حالته الحالية.",
        orderId: "رقم الطلب",
        action: "تتبع",
        loading: "جارٍ تحميل الطلب...",
        notFound: "لم يتم العثور على طلب بهذا الرقم.",
        customer: "العميل",
        order: "طلب",
      },

      orderStatus: {
        pending: "قيد الانتظار",
        preparing: "قيد التحضير",
        out_for_delivery: "خرج للتوصيل",
        delivered: "تم التسليم",
      },
      checkout: {
        title: "إتمام الطلب",
        deliveryDetails: "بيانات التوصيل",
        fullName: "الاسم بالكامل",
        fullNamePlaceholder: "أحمد محمد",
        phoneNumber: "رقم الهاتف",
        phonePlaceholder: "01012345678",
        address: "العنوان",
        addressPlaceholder: "الشارع، العمارة، الشقة، المدينة",
        paymentMethod: "طريقة الدفع",
        cash: "كاش",
        online: "أونلاين",
        orderSummary: "ملخص الطلب",
        items: "العدد",
        total: "الإجمالي",
        placeOrder: "تأكيد الطلب",
        backToMenu: "العودة للقائمة",
      },

      orderSteps: {
        pending: {
          title: "تم استلام الطلب",
          description: "تم استلام طلبك بنجاح.",
        },
        preparing: {
          title: "قيد التحضير",
          description: "يتم تحضير طلبك الآن.",
        },
        out_for_delivery: {
          title: "خرج للتوصيل",
          description: "طلبك في الطريق إليك.",
        },
        delivered: {
          title: "تم التسليم",
          description: "بالهناء والشفاء.",
        },
      },

      admin: {
        dashboard: "لوحة التحكم",
        products: "المنتجات",
        orders: "الطلبات",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;