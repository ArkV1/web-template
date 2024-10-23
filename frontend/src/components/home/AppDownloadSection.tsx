import { QrCodeIcon } from '@heroicons/react/24/outline'

export default function AppDownloadSection() {
  return (
    <section className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-3 gap-12 items-center">
          {/* Left side - Image */}
          <div className="relative">
            <img
              src="https://placehold.co/400x500"
              alt="Mobile app preview"
              className="w-full max-w-[360px] mx-auto"
            />
          </div>

          {/* Middle - Title and Description */}
          <div className="text-left">
            <h2 className="text-[40px] font-bold mb-4 leading-tight">
              EXPLORE THE WORLD FROM YOUR FINGERTIPS!
            </h2>
            <p className="text-gray-600 text-lg">
              Discover what's going on at Selinas near you, connect with our 
              guests and community, and book trips at the touch of a button 
              when you download the Selina app!
            </p>
          </div>

          {/* Right side - Download Options */}
          <div className="space-y-6">
            <div>
              <p className="text-sm mb-4">Scan or click to download the Selina app</p>
              <div className="flex gap-4">
                <div className="w-24 h-24 bg-gray-100">
                  <img 
                    src="https://placehold.co/96" 
                    alt="QR Code"
                    className="w-full h-full"
                  />
                </div>
                <div className="space-y-2">
                  <img
                    src="https://placehold.co/140x40/000000/FFFFFF/png"
                    alt="Get it on Google Play"
                    className="h-10"
                  />
                  <img
                    src="https://placehold.co/140x40/000000/FFFFFF/png"
                    alt="Download on the App Store"
                    className="h-10"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-px bg-gray-200 flex-1"></div>
              <span className="text-sm text-gray-500">OR</span>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>

            <div>
              <p className="font-medium mb-1">Download via Email</p>
              <p className="text-sm text-gray-500 mb-4">
                Once you submit your email, we'll send you a link to download the app
              </p>
              <input
                type="email"
                placeholder="Please type your email here"
                className="w-full px-4 py-3 border border-gray-300 rounded-md mb-3"
              />
              <button
                type="submit"
                className="w-full px-4 py-3 bg-gray-800 text-white rounded-md uppercase"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
