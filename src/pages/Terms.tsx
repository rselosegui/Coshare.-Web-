import React from 'react';
import { SEO } from '../components/SEO';

const sections = [
  {
    title: '1. Acceptance of Terms',
    body: 'By accessing or using Coshare, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the app.',
  },
  {
    title: '2. Description of Service',
    body: 'Coshare is a mobile application that enables users to co-own items, manage bookings, split expenses, and communicate with co-owners. The service is provided "as is" and may be updated or modified at any time.',
  },
  {
    title: '3. Account Registration',
    body: 'You must create an account to use Coshare. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must be at least 13 years old to use this service.',
  },
  {
    title: '4. User Responsibilities',
    body: 'You agree to use Coshare only for lawful purposes and in accordance with these terms. You are responsible for all content you upload, including item descriptions, images, and messages. You must not use the service to harass, threaten, or harm other users.',
  },
  {
    title: '5. Prohibited Conduct',
    body: 'You may not: (a) use the service for any illegal purpose; (b) attempt to gain unauthorized access to any part of the service; (c) transmit any harmful, offensive, or disruptive content; (d) impersonate another person or entity; (e) interfere with the proper functioning of the service.',
  },
  {
    title: '6. Intellectual Property',
    body: 'The Coshare app, including its design, features, and content created by us, is owned by Coshare and protected by intellectual property laws. You retain ownership of content you upload, but grant us a license to use it to provide the service.',
  },
  {
    title: '7. Account Termination',
    body: 'You may delete your account at any time from the Account screen. We reserve the right to suspend or terminate your account if you violate these terms or engage in conduct that we determine is harmful to other users or the service.',
  },
  {
    title: '8. Disclaimer of Warranties',
    body: 'Coshare is provided "as is" without warranties of any kind, either express or implied. We do not warrant that the service will be uninterrupted, error-free, or free of viruses or other harmful components.',
  },
  {
    title: '9. Limitation of Liability',
    body: 'To the fullest extent permitted by law, Coshare shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the service.',
  },
  {
    title: '10. Changes to Terms',
    body: 'We may modify these Terms of Service at any time. We will notify you of material changes through the app. Your continued use of the service after changes constitutes your acceptance of the new terms.',
  },
  {
    title: '11. Governing Law',
    body: 'These Terms of Service are governed by applicable law. Any disputes arising from these terms or your use of the service shall be resolved through good-faith negotiation.',
  },
  {
    title: '12. Contact Us',
    body: 'If you have questions about these Terms of Service, please contact us at legal@coshare.ai.',
  },
];

export const Terms = () => {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <SEO
        title="Terms of Service | Coshare"
        description="Read the Coshare Terms of Service governing your use of the platform."
        canonical="https://www.coshare.ai/terms"
      />

      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#05A7E8] mb-4">Legal</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-[#0b1b34] mb-4">Terms of Service</h1>
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
