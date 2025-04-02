// src/app/faq/faq-data.js

/**
 * FAQ data structure with categories
 */
export const allFaqs = [
  {
    category: "Product Information",
    question: "How do I determine my bracelet size?",
    answer:
      'Measure your wrist circumference with a flexible tape measure. Add 0.5-1 inch (1.3-2.5 cm) to your wrist measurement for a comfortable fit. Our bracelets come in sizes XS (5.5"), S (6"), M (6.5"), L (7"), and XL (7.5"). For a more precise fit, we offer a complimentary sizing guide with every order.',
  },
  {
    category: "Product Information",
    question: "What materials are used in Empress bracelets?",
    answer:
      "Our bracelets are crafted using ethically sourced precious metals including sterling silver, 18K gold, and rose gold plating. Select pieces feature genuine gemstones such as moonstone, amethyst, jade, opal, pearl, blue topaz, amazonite, and mother of pearl. We prioritize hypoallergenic materials and each piece undergoes rigorous quality testing.",
  },
  {
    category: "Product Care",
    question: "How should I care for my Empress bracelet?",
    answer:
      "To maintain your bracelet's beauty, we recommend storing it in the provided jewelry pouch when not in use. Avoid contact with perfumes, lotions, and chemicals. Clean gently with a soft, lint-free cloth. For silver pieces, use a specialized silver polishing cloth to restore shine. We offer a complimentary cleaning kit with purchases over $150.",
  },
  {
    category: "Orders & Shipping",
    question: "What is your return and exchange policy?",
    answer:
      "We accept returns and exchanges within 30 days of delivery. Items must be in their original condition with all packaging and documentation included. Returns due to craftsmanship issues are eligible for a full refund or exchange. For hygiene reasons, custom or personalized items cannot be returned unless defective.",
  },
  {
    category: "Orders & Shipping",
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship to over 50 countries worldwide. Standard international shipping takes 7-14 business days. Express shipping (3-5 business days) is available for most countries. Import duties and taxes may apply depending on your location and are the responsibility of the customer. All shipments include tracking information.",
  },
  {
    category: "Product Care",
    question: "Are Empress bracelets water-resistant?",
    answer:
      "While our bracelets are crafted for durability, we recommend removing them before swimming, showering, or engaging in activities with excessive moisture. Brief exposure to water won't damage most pieces, but prolonged contact may affect the finish and mechanics. For specific care instructions for your piece, please refer to the care card included with your purchase.",
  },
  {
    category: "Customer Service",
    question: "Do you offer bracelet repairs or re-sizing?",
    answer:
      "Yes, we provide repair and re-sizing services for all Empress bracelets. Re-sizing is complimentary within the first 60 days of purchase. After this period, or for repairs, a nominal fee may apply depending on the complexity of the work required. Please contact our customer service team to arrange for these services.",
  },
  {
    category: "Customer Service",
    question: "What is the warranty period for Empress bracelets?",
    answer:
      "All Empress bracelets come with a one-year limited warranty against manufacturing defects. This covers issues with clasps, chain integrity, and stone settings under normal wear. The warranty does not cover damage resulting from accidents, improper use, or natural wear over time. Extended warranty options are available for purchase.",
  },
  {
    category: "Collections",
    question: "What collections does Empress offer?",
    answer:
      "Empress offers four distinct collections, each with its own unique character and aesthetic: Ethereal, Divine, Heritage, and Celestial Bloom. Each collection features carefully curated pieces that reflect different aspects of elegance and sophistication.",
  },
  {
    category: "Collections",
    question: "Can you tell me about the Ethereal Collection?",
    answer:
      "The Ethereal Collection embodies whispers of grace and serenity, featuring soft hues and luminous stones that reflect inner beauty. Notable pieces include Aurelia (with Opal, Pearl, Jade Thread, representing golden light and timeless grace), Aluna (featuring Opal, Blue Topaz, Amazonite, Pearl, symbolizing moonlit calm and gentle renewal), Sorelle (with Amethyst and Mother of Pearl, representing sisterhood, protection, and wisdom), and Selene (featuring Pink Conch and Pearl, named after the goddess of the moon, representing feminine beauty).",
  },
  {
    category: "Product Information",
    question: "What do the stones and materials in your bracelets symbolize?",
    answer:
      "Each material in our bracelets carries special meaning: Opal represents hope and purity, Pearl symbolizes wisdom and integrity, Jade stands for harmony and balance, Blue Topaz enhances communication and self-expression, Amazonite represents courage and truth, Amethyst offers protection and spiritual awareness, and Mother of Pearl symbolizes prosperity and intuition. We carefully select these materials to create pieces that are not only beautiful but also meaningful.",
  },
  {
    category: "Orders & Shipping",
    question: "How can I track my order?",
    answer:
      "Once your order ships, you'll receive a confirmation email with your tracking information. You can also track your order by logging into your account on our website and navigating to the 'Order History' section. If you have any issues accessing your tracking information, please contact our customer support team.",
  },
  {
    category: "Customer Service",
    question: "How can I contact customer support?",
    answer:
      "Our customer support team is available Monday through Friday, 9am to 6pm EST. You can reach us via email at support@empressbracelets.com, by phone at 1-800-EMPRESS, or through the live chat feature on our website. For after-hours inquiries, please leave a message and we'll respond within one business day.",
  },
  {
    category: "Account & Privacy",
    question: "How is my personal information protected?",
    answer:
      "We take your privacy seriously. All personal information is encrypted and securely stored following industry-standard protocols. We never share your information with third parties without your explicit consent. For more details, please review our Privacy Policy on our website.",
  },
  {
    category: "Product Information",
    question: "Are your materials ethically sourced?",
    answer:
      "Yes, we are committed to ethical sourcing practices. All our gemstones and precious metals come from suppliers who adhere to responsible mining and production standards. We regularly audit our supply chain to ensure compliance with ethical guidelines and environmental regulations.",
  },
  {
    category: "Account & Privacy",
    question: "How do I create or manage my account?",
    answer:
      "To create an account, click on the 'Account' icon in the top right corner of our website and select 'Create Account.' For existing customers, log in using your email and password to access your account dashboard. From there, you can manage your profile information, view order history, track shipments, and update payment methods.",
  },
];

/**
 * Get unique categories from FAQ data
 */
export const getCategories = () => {
  return ["All", ...new Set(allFaqs.map((faq) => faq.category))];
};

/**
 * Filter FAQs by category and search query
 */
export const filterFaqs = (category, searchQuery) => {
  let result = [...allFaqs];

  // Filter by category if not "All"
  if (category !== "All") {
    result = result.filter((faq) => faq.category === category);
  }

  // Filter by search query if it exists
  if (searchQuery && searchQuery.trim() !== "") {
    const query = searchQuery.toLowerCase();
    result = result.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query)
    );
  }

  return result;
};
