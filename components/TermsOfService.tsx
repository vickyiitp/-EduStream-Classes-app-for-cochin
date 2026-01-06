
import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-black text-slate-900">Terms of Service</h1>
        <p className="text-slate-500">Last Updated: October 2024</p>
      </div>

      <div className="space-y-8 prose prose-slate">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p className="text-slate-600 leading-relaxed">
            By accessing or using our services, you agree to be bound by these Terms of Service and all terms incorporated by reference.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">2. User Accounts</h2>
          <p className="text-slate-600 leading-relaxed">
            You must be at least 13 years old to use this service. You are responsible for maintaining the security of your account and password.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">3. Payment Terms</h2>
          <p className="text-slate-600 leading-relaxed">
            Course fees are non-refundable unless specified otherwise in a specific batch's refund policy. All transactions are processed securely.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">4. Intellectual Property</h2>
          <p className="text-slate-600 leading-relaxed">
            All course content, including videos and PDFs, is the intellectual property of EduStream and is for personal use only. Sharing account access is strictly prohibited.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
