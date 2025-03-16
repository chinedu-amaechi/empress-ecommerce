// src/components/ui/button.js

function Button({ type, children }) {
  return (
    <button className="w-full bg-[#11296B] hover:bg-[#1E96FC] text-white font-medium py-2.5 rounded-lg transition-colors">
      {children}
    </button>
  );
}

export default Button;
