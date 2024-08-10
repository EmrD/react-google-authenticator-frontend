import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

function App() {
  const [username, setUsername] = useState('');
  const [authKey, setAuthKey] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isRegistering, setIsRegistering] = useState(true); 

  const handleRegister = () => {
    fetch('https://react-authentication-backend.vercel.app/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Register response:', data);

        if (data.message === 'Kullanıcı zaten kayıtlı') {
          toast.error("Kullanıcı adı zaten kayıtlı. Lütfen tek kullanımlık şifrenizi girerek giriş yapın.");
        } else if (data.qrCodeUrl) {
          setQrCodeUrl(data.qrCodeUrl);
          toast.success("Kayıt başarılı, QR kodu oluşturuldu. İşleme authenticator uygulamanızdan devam edin.");
        } else {
          toast.error('Kayıt sırasında bir hata oluştu.');
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const handleLogin = () => {
    const data = { username, authKey };

    fetch('https://react-authentication-backend.vercel.app/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'QR kodu oluşturuldu') {
          toast.success("QR kodu oluşturuldu. Lütfen işleme authenticator uygulamanızdan devam edin.");
        } else if (data.message === 'Kullanıcı zaten kayıtlı') {
          toast.error("Kullanıcı adı zaten kayıtlı. Lütfen şifrenizi girerek giriş yapın.");
        } else {
          if (data.message === "Geçersiz kod"){
              toast.error("Geçersiz kod");
          }else if (data.message === "Giriş başarılı."){
            toast.success("Giriş başarılı. Aktif kullanıcı: " + username);
          }
          else {
            toast.error(data.message);
          }
        }
      })
      .catch(error => {
        toast.error('Error:', error);
      });
  };

  return (
    <div className="h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h4 className='text-xl font-bold text-center mb-4'>React Google Authenticator App</h4>
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 rounded-tl-lg rounded-tr-lg font-semibold focus:outline-none ${isRegistering ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}
            onClick={() => setIsRegistering(true)}
          >
            Kayıt Ol
          </button>
          <button
            className={`px-4 py-2 rounded-tl-lg rounded-tr-lg font-semibold focus:outline-none ${!isRegistering ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}
            onClick={() => setIsRegistering(false)}
          >
            Giriş Yap
          </button>
        </div>

        {isRegistering ? (
          <div>
            <h2 className="text-xl font-bold text-center mb-4">Kullanıcı Adınızı Girin</h2>
            <input
              type="text"
              id="username"
              className="w-full border-2 border-gray-300 rounded p-2 mb-4 focus:outline-none focus:border-indigo-600"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Kullanıcı Adı"
            />
            <button
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition duration-200"
              onClick={handleRegister}
              disabled={!username.trim()}
            >
              Kayıt Ol
            </button>
            {qrCodeUrl && (
              <div className="mt-6 text-center">
                <h3 className="text-lg font-bold">QR Kodunu Taratın</h3>
                <img src={qrCodeUrl} alt="QR Code" className="mx-auto" />
              </div>
            )}
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold text-center mb-4">Giriş Yapın</h2>
            <input
              type="text"
              id="username"
              className="w-full border-2 border-gray-300 rounded p-2 mb-4 focus:outline-none focus:border-indigo-600"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Kullanıcı Adı"
            />
            <input
              type="text"
              id="authkey"
              className="w-full border-2 border-gray-300 rounded p-2 mb-4 focus:outline-none focus:border-indigo-600"
              value={authKey}
              onChange={(e) => setAuthKey(e.target.value)}
              placeholder="Authenticator Kodu"
              autocomplete="off"
            />
            <button
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition duration-200"
              onClick={handleLogin}
              disabled={!username.trim() || !authKey.trim()}
            >
              Giriş Yap
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
