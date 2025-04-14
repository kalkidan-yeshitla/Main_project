import { ArrowLeft, CheckCircle, Eye, EyeOff, Lock } from "lucide-react";
import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';



const ChangePasswordPage=({darkMode} : {darkMode:boolean}) =>{
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [requirements, setRequirements] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialchar: false,
    match: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const validatePassword = (newPassword: string, confirmPassword: string) => {
    const isMatch = newPassword === confirmPassword && newPassword !== '';
    setRequirements(prev => ({...prev,
      length: newPassword.length >= 8,
      uppercase: /[A-Z]/.test(newPassword),
      number: /\d/.test(newPassword),
      specialchar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
      match: isMatch
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!requirements.match) {
      setError('New Passwords do not match');
      return;
    }
    if (!requirements.length || !requirements.uppercase || !requirements.number || !requirements.specialchar) {
      setError('Password does not meet requirements');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
    }, 2000);
  };



  const isPasswordValid = Object.values(requirements).every(Boolean);


  return (
    <div className={`w-2/3 mx-auto mt-16 p-6 rounded-lg overflow-auto scroll-smooth ${ darkMode ? 'bg-zinc-800 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      <Helmet>
        <title>change password</title>
      </Helmet>
      <button
        onClick={() => navigate(-1)}
        className={`flex mb-6 transition-colors ${darkMode ? 'text-purple-300 hover:text-purple-300' : 'text-purple-600 hover:text-purple-800'
        }`}
      >
        <ArrowLeft size={20} /> 
      </button>
      <div className={`max-w-lg mx-auto rounded-xl shadow-md overflow-hidden ${darkMode ? 'bg-zinc-700' : 'bg-white'
      }`}>
        <div className={`p-6 ${darkMode ? 'bg-gradient-to-r from-purple-500 ' : 'bg-gradient-to-r from-purple-50 to-blue-50'
        }`}>
          <div className="flex items-center gap-3">
            <Lock size={24} className={darkMode ? "text-purple-950" : "text-purple-600"} />
            <h1 className="text-2xl font-bold "> Change Password</h1>
          </div>
          <p className={`mt-1 ${darkMode ? 'text-gray-200' : 'text-gray-600'}`}> Secure your account </p>
        </div>
        {success ? (
          <div className="p-6 text-center">
            <CheckCircle className="mx-auto text-green-500" size={48} />
            <h2 className="text-xl font-semibold mt-4">Password Updated</h2>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}> Current Password</label>
              <div className="relative">
                <input type={showCurrent ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 pr-10 ${darkMode ? 'bg-zinc-600 border-gray-500 focus:ring-purple-400 text-white' 
                      : 'focus:ring-purple-300 border-gray-300' }`}
                  required />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 hover:text-purple-600 ${darkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-500'}`}
                >
                 {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />} 
                </button>
              </div>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                New Password</label>
              <div className="relative">
                <input type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    validatePassword(e.target.value, confirmPassword);
                  } }
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 pr-10 ${darkMode  ? 'bg-zinc-600 border-gray-500 focus:ring-purple-400 text-white' 
                      : 'focus:ring-purple-300 border-gray-300' }`}
                  required />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 hover:text-purple-600 ${darkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-500'}`}
                >
                  {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            


            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Confirm Password</label>
              <div className="relative">
                <input type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    validatePassword(newPassword, e.target.value);

                  } }
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 pr-10 ${darkMode ? `bg-zinc-600 border-gray-500 
                      ${requirements.match ? 'focus:ring-green-400' : 'focus:ring-purple-400'} text-white` 
                      : `${requirements.match ? 'focus:ring-green-300' : 'focus:ring-purple-300'} border-gray-300`
                  }`}
                  required />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 hover:text-purple-600 ${darkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-500'}`}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className={`p-3 rounded-lg ${darkMode ? 'bg-zinc-600' : 'bg-gray-50'}`}>
              <h3 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Password Requirements:</h3>
              <ul className="space-y-1 text-sm">
                <li className={`flex items-center ${requirements.length ? 'text-green-500' : (darkMode ? 'text-gray-400' : 'text-gray-500')}`}>
                  {requirements.length ? '✓' : '.'} At least 8 characters
                </li>
                <li className={`flex items-center ${requirements.uppercase ? 'text-green-500' : (darkMode ? 'text-gray-400' : 'text-gray-500')}`}>
                  {requirements.uppercase ? '✓' : '.'} At least 1 uppercase letter
                </li>
                <li className={`flex items-center ${requirements.number ? 'text-green-500' : (darkMode ? 'text-gray-400' : 'text-gray-500')}`}>
                  {requirements.number ? '✓' : '.'} At least 1 number
                </li>
                <li className={`flex items-center ${requirements.specialchar ? 'text-green-500' : (darkMode ? 'text-gray-400' : 'text-gray-500')}`}>
                  {requirements.specialchar ? '✓' : '.'} At least 1 special character
                </li>
                <li className={`flex items-center ${requirements.match ? 'text-green-500' : (darkMode ? 'text-gray-400' : 'text-gray-500')}`}>
                  {requirements.match ? '✓' : '.'} passwords match
                </li>
              </ul>
            </div>


            {error && (
              <div className={`text-sm p-2 rounded-lg ${darkMode ? 'bg-red-900 text-red-200' : 'bg-red-50 text-red-500' }`}>
                {error}
              </div>
            )}

            <div className="pt-4">
              <button
                type="submit"
                disabled={!isPasswordValid || isLoading}
                className={`py-2 px-4 rounded-lg font-medium transition-colors ${!isPasswordValid
                    ? (darkMode ? 'bg-gray-500 cursor-not-allowed' : 'bg-gray-300 cursor-not-allowed')
                    : (darkMode ? 'bg-purple-950 hover:bg-purple-900 text-white' : 'bg-purple-900 hover:bg-purple-800 text-white')
                }`}
              >
                {isLoading ? 'Processing...' : 'Change Password'}
              </button>
            </div>
          </form>
          
        )}
      </div>
    </div>
  );
}

export default ChangePasswordPage;