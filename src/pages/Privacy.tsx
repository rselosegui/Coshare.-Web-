import React from 'react';
import { SEO } from '../components/SEO';

const sections = [
  {
    title: '1. Information We Collect',
    body: 'We collect information you provide directly to us when you create an account, such as your name, username, email address, phone number, and profile picture. We also collect information about your use of the app, including items you add, bookings you make, expenses you record, and messages you send.',
  },
  {
    title: '2. How We Use Your Information',
    body: 'We use the information we collect to provide, maintain, and improve the Coshare service, to process transactions, to send you notifications about items, bookings, and expenses, and to communicate with you about your account.',
  },
  {
    title: '3. Information Sharing',
    body: 'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. Your profile information (name, username, and avatar) is visible to other co-owners of items you share with them.',
  },
  {
    title: '4. Third-Party Services',
    body: 'We use Supabase to store and process your data. Supabase acts as our data processor and handles your data in accordance with their privacy policy. Your data is stored on servers located in the European Union. We also use Expo for push notifications.',
  },
  {
    title: '5. Data Retention',
    body: 'We retain your personal information for as long as your account is active. If you delete your account through the app, your account is deactivated and you will no longer be able to sign in. You may contact us to request complete deletion of your data.',
  },
  {
    title: '6. Your Rights',
    body: 'You have the right to access, correct, or delete your personal information. You can update your profile information at any time from the Account screen. You can delete your account at any time from the Account screen under "Danger Zone." For complete data deletion requests, please contact us at the email below.',
  },
  {
    title: '7. Security',
    body: 'We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. All data is transmitted over HTTPS and stored securely.',
  },
  {
    title: "8. Children's Privacy",
    body: 'Coshare is not directed to children under 13. We do not knowingly collect personal information from children under 13. If you believe a child under 13 has provided us with personal information, please contact us.',
  },
  {
    title: '9. Changes to This Policy',
    body: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy in the app. Your continued use of Coshare after any changes constitutes your acceptance of the new policy.',
  },
  {
    title: '10. Contact Us',
    body: 'If you have questions or concerns about this Privacy Policy, please contact us at privacy@coshare.ai.',
  },
];

export const Privacy = () => {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <SEO
        title="Privacy Policy | Coshare"
        description="Learn how Coshare collects, uses, and protects your personal information."
        canonical="https://www.coshare.ai/privacy"
      />

      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#05A7E8] mb-4">Legal</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-[#0b1b34] mb-4">Privacy Policy</h1>
          <p className="text-sm text-gray-400">Last updated: February 28, 2026</p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-bold text-[#0b1b34] mb-3">{section.title}</h2>
              <p className="text-gray-600 leading-relaxed">{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
