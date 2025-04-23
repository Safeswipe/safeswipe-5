export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 text-left">
      <h1 className="text-3xl font-bold text-purple-800 mb-4">Privacy Policy</h1>
      <p className="text-gray-700 mb-4">
        SafeSwipe does not store your uploaded images or identity searches. All image processing is handled locally in the browser, and no personal data is retained or shared.
      </p>
      <p className="text-gray-700">
        We use Stripe for payment processing, which is fully PCI compliant. We do not have access to or store your credit card information.
      </p>
    </div>
  );
}
