
import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-black text-slate-900">Privacy Policy</h1>
        <p className="text-slate-500">Last Updated: October 2024</p>
      </div>

      <div className="space-y-8 prose prose-slate">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">1. Information We Collect</h2>
          <p className="text-slate-600 leading-relaxed">
            We collect information you provide directly to us when you create an account, participate in any interactive features of the Services, fill out a form, or otherwise communicate with us.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">2. How We Use Your Information</h2>
          <p className="text-slate-600 leading-relaxed">
            We use the information we collect to provide, maintain, and improve our services, to provide the training you've signed up for, and to send you technical notices, updates, and support messages.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">3. Data Security</h2>
          <p className="text-slate-600 leading-relaxed">
            We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">4. Contact Us</h2>
          <p className="text-slate-600 leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us at privacy@edustream.com.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
