import { Mail } from 'lucide-react';
import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6 space-y-16">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
            Our Vision and Mission
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed text-justify">
            This web platform is dedicated to showcasing the projects that emerge from the incubator, 
            acting as a window into the creativity and entrepreneurial spirit of its startups.
            Its primary goal is to provide greater visibility to project leaders and their ventures, 
            helping them reach a broader audience and strengthen their market presence. 
            Beyond visibility, the platform serves as a bridge between startups and key stakeholders such as investors, 
            strategic partners, and potential clients, fostering opportunities for growth and collaboration. 
            It also aims to promote a culture of innovation by highlighting cutting-edge ideas and success stories, 
            inspiring both the entrepreneurial community and external supporters. 
            To remain engaging and relevant, the platform ensures dynamic and regular updates on projects, 
            highlighting milestones, achievements, and ongoing progress, 
            thereby creating a living showcase of innovation in action.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Our Team
          </h1>
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-blue-600 mb-4 border-b-2 border-blue-100 pb-2">
                Managers
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Elena Hanka', 'Bylel Jourdin', 'Javier Barrera'].map((name) => (
                  <div key={name} className="bg-blue-50 rounded-lg p-4 text-center">
                    <p className="font-medium text-gray-900">{name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-green-600 mb-4 border-b-2 border-green-100 pb-2">
                Developers
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {['Nolann Dubos', 'Quentin Lapierre', 'Etienne Labarbe', 'Arthur Guerinault'].map((name) => (
                  <div key={name} className="bg-green-50 rounded-lg p-4 text-center">
                    <p className="font-medium text-gray-900">{name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Contact Us
          </h1>
          <div className="space-y-4">
            {[
              'elena.enka@jeb-incubator.com',
              'bylel.jourdin@jeb-incubator.com', 
              'javier.barrera@jeb-incubator.com'
            ].map((email) => (
              <div key={email} className="bg-gray-50 rounded-lg p-4 flex items-center justify-center">
                <Link
                  href={`mailto:${email}`}
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 flex items-center gap-2"
                >
                  <Mail />
                  {email}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}