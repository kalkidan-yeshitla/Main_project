import { useNavigate} from "react-router-dom";
import { ArrowLeft, Camera, Mail, Minus, Phone, Plus, User} from "lucide-react";
import {useState, useRef} from "react";


const EditProfilePage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null); 
  const [profileData, setProfileData] = useState({
    image: 'https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg',
    name: 'Kalkidan Yeshitla',
    primaryEmail: 'kalyeshi1@gmail.com',
    primaryPhone: '+251 923 202 495',
    additionalEmails: [] as string[],
    additionalPhones: [] as string[],
  });
  const [newEmail, setNewEmail]= useState('');
  const [newPhone, setNewPhone]= useState('');
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file){
      const reader = new FileReader();
      reader.onload=()=> {
        if(typeof reader.result === 'string'){
          setProfileData({...profileData, image: reader.result});
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const addContact = (type:'email' | 'phone')=> {
    const value = type==='email' ? newEmail : newPhone;
    if (!value) return;
    const field = type ==='email' ? 'additionalEmails' : 'additionalPhones';

    if(!profileData[field].includes(value)) {
      setProfileData({
        ...profileData, [field]: [...profileData[field], value]
      });
      type === 'email' ? setNewEmail(''): setNewPhone('');
    }
  };

  const removeContact = (type: 'email' | 'phone', index:number)=>{
    const field = type==='email' ? 'additionalEmails' : 'additionalPhones';
    setProfileData({...profileData, [field]: profileData[field].filter((_, i) => i !== index)
    });
  };
  const handleSubmit =(e: React.FormEvent)=> {
    e.preventDefault();
    console.log('Saved data:', profileData);
    alert('Profile updated successfully!');
    navigate(-1);
  };

  return(

    <div className=" w- mx-auto mt-16 p-6 min-h-screen bg-gray-50  shadow-md rounded-lg">
      <button
         onClick={() => navigate(-1)}
         className="flex items-center gap-2 text-purple-600 mb-6 hover:text-purple-400 transition-colors">
         <ArrowLeft size={20} /> Back
      </button>

      <div className="max-w mx-auto bg-white p-6 rounded-xl shadow-md overflow-hidden"> 
        {/* profile header */}
        <div className='bg-gradient-to-r from-purple-50 to-blue-50 p-6 flex flex-col md:flex-row items-center'> 
          <div className='relative group mb-4 md:mb-0 md:mr-6'>
            <img 
               src={profileData.image}
               alt='Profile'
               className='w-24 h-24 md;w-32 md:h-32 rounded-full object-cover border-white shadow-lg'/>
               <button
                  onClick={() => fileInputRef.current?.click()}
                  className='absulute bottom-0 right-0 bg-gray-600 text-white p-2 rounded-full   transition-opacity duration-300'>
                    <Camera size={18} />
               </button>
               <input type='file' ref={fileInputRef} onChange={handleImageUpload} accept='image/*' className='hidden'/>
           </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Edit Your Profile</h1>
            <p className="text-gray-600">Update your personal information</p>
          </div>
       </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <span className="bg-gary-100 px-4 py-2 text-gray-500">
                <User size={18}/>
              </span>
              <input type="text" value={profileData.name} onChange={(e) => setProfileData({...profileData,name:e.target.value})} className="flex-1 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-purple-300"
                required /> 
            </div>
          </div>
          <div className=" grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
             <label className="block text-sm font-medium text-gray-700 items-center">
              <Mail size={16} className="mr-2"/> Primary Email
             </label>
             <div className="flex items-center border rounded-lg overflow-hidden">
               <input type="email" value={profileData.primaryEmail} onChange={(e) => setProfileData({...profileData, primaryEmail: e.target.value})} className="flex-1 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-purple-300"
                required />
             </div>
           </div>
           <div className="space-y-2">
             <label className="block text-sm font-medium text-gray-700 items-center">
              <Phone size={16} className="mr-2"/> Primary Phone
             </label>
             <div className="flex items-center border rounded-lg overflow-hidden">
               <input type="tel" value={profileData.primaryPhone} onChange={(e) => setProfileData({...profileData, primaryPhone: e.target.value})} className="flex-1 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-purple-300"
                required />
             </div>
          </div>
         </div>

         <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 items-center">
              Additional Emails
            </label>
            <div className="flex mb-2">
               <input 
                 type="email" 
                 value={newEmail} 
                 onChange={(e)=> setNewEmail(e.target.value)} 
                 className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-1 focus:ring-purple-300" 
                />
                <button
                 type="button"
                 onClick={() => addContact('email')}
                 className="bg-purple-600 text-white px-3 rounded-r-lg hover:bg-purple-700 transition-colors">
                  <Plus size={20} />
                 </button>
            </div>
            <ul className="space-y-2">
              {profileData.additionalEmails.map((email, index)=>(
                <li key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg" > 
                  <span className="text-sm">{email}</span>
                  <button
                    type="button"
                    onClick={()=> removeContact('email', index)}
                    className="text-red-500 hover:text-red-700 p-1 rounded-full">
                      <Minus size={16}/>
                    </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 items-center">
              Additional Phones
            </label>
            <div className="flex mb-2">
               <input 
                 type="tel" 
                 value={newPhone} 
                 onChange={(e)=> setNewPhone(e.target.value)} 
                 className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-1 focus:ring-purple-300" 
                />
                <button
                 type="button"
                 onClick={() => addContact('phone')}
                 className="bg-purple-600 text-white px-3 rounded-r-lg hover:bg-purple-700 transition-colors">
                  <Plus size={20} />
                 </button>
            </div>
            <ul className="space-y-2">
              {profileData.additionalPhones.map((phone, index)=>(
                <li key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg" > 
                  <span className="text-sm">{phone}</span>
                  <button
                    type="button"
                    onClick={()=> removeContact('phone', index)}
                    className="text-red-500 hover:text-red-700 p-1 rounded-full">
                      <Minus size={16}/>
                    </button>
                </li>
              ))}
            </ul>
          </div>
         </div>
         <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Save Changes
            </button>
          </div>  
         
         </form>
        </div>
    </div>
  );
}

export default EditProfilePage;