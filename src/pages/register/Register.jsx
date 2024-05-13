import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import background from '../../asset/image/bg-01.webp';
import { authActions } from '../../auth/auth.action';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Register() {
  const [error, setError] = useState('');
  const [visibalePass, setVisibalePass] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log('data :: ', data);
    authActions()
      .register(data)
      .then((successfull) => {
        alert('Register Cuccessfull');
        notify('Đăng ký thành công', 'success');
        navigate('/login');
      })
      .catch((err) => {
        notify(err, 'error');
      });
  };
  const notify = (message, type) => toast(message, { type });
  return (
    <div className="w-full h-full flex justify-center items-center p-4 fixed inset-0 z-10 bg-gray-50 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[500px] rounded-[10px] bg-gray-50 lg:pb-[30px] sm:px-[55px] sm:pt-[30px] sm:pb-[54px]"
      >
        <p className="font-Popins font-bold text-[39px] text-[#333] leading-[1.2] text-center pb-[49px]">Đăng Ký</p>

        {/* name */}

        <div className="flex  flex-wrap mb-5 pb-[2px] relative">
          <span className="text-sm text-[#333] font-Popins leading-[1.5]">Tên Đầy Đủ</span>
          <div className="w-full flex justify-start items-center h-[55px] relative">
            <AccountCircleIcon className="text-gray-900 absolute left-1" />
            <input
              {...register('fullname', {
                required: 'Không để trống trường này  ',
                minLength: {
                  value: 4,
                  message: 'Tên tối thiểu 4 ký tự',
                },
                pattern: {
                  value: /^[a-zàáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ ]{8,255}$/i,
                  message: 'Tên tiếng Việt không hợp lệ',
                },
              })}
              placeholder="Nhập tên"
              className="pl-8 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 "
              type="text"
            />
          </div>
        </div>
        <div>
          {errors.fullname && (
            <span className="mb-2 text-red-600 block text-sm font-Popins tracking-wider">
              {errors.fullname.message}
            </span>
          )}
        </div>

        {/* username */}

        <div className="flex  flex-wrap mb-5 pb-[2px] relative">
          <span className="text-sm text-[#333] font-Popins leading-[1.5]">Email</span>
          <div className="w-full flex justify-start items-center h-[55px] relative">
            <EmailIcon className="text-gray-900 absolute left-1" />
            <input
              {...register('email', {
                required: 'Không để trống trường này  ',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Phải là email',
                },
              })}
              placeholder="Nhập email"
              className="pl-8 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 "
              type="text"
            />
          </div>
        </div>
        <div>
          {errors.email && (
            <span className="mb-2 text-red-600 block text-sm font-Popins tracking-wider">{errors.email.message}</span>
          )}
        </div>

        {/* password */}

        <div className="flex flex-wrap mb-5 relative">
          <span className="text-sm text-[#333] font-Popins leading-[1.5]">Mật khẩu</span>
          <div className="w-full flex justify-start items-center h-[55px] relative">
            <LockIcon className="text-gray-900 absolute left-1"></LockIcon>
            <input
              {...register('password', {
                required: 'Không để trống trường này',
                pattern: {
                  value: /^(?=.*?[a-z])(?=.*[@$!%*#?&])(?=.*?[0-9]).{8,}$/,
                  message: 'Ít nhất 8 ký tự, với ít nhất 1 chữ cái, 1 số, 1 ký tự đặc biệt',
                },
              })}
              className="pl-8 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Nhập mật khẩu"
              type={visibalePass ? 'text' : 'password'}
            />
            <div className="cursor-pointer absolute right-1" onClick={() => setVisibalePass(!visibalePass)}>
              {visibalePass ? (
                <RemoveRedEyeOutlinedIcon className="text-gray-900" />
              ) : (
                <VisibilityOffOutlinedIcon className="text-gray-900" />
              )}
            </div>
          </div>
        </div>
        <div>
          {errors.password && (
            <span className="mb-2 text-red-600 block text-sm font-Popins tracking-wider">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="mt-10 cursor-pointer flex justify-center items-center rounded-[25px] bg-gray-900 transition-all ease-in-out duration-700">
          <button className="uppercase tracking-[2px] w-full p-4 text-white" type="submit">
            Đăng Ký
          </button>
        </div>

        <div className="text-center mt-10 font-Popins">
          <p className="text-sm text-[#666666]">Đã có tài khoản ?</p>
          <p
            onClick={() => {
              navigate('/login');
            }}
            className="mt-5 text-[#333] cursor-pointer hover:opacity-90 tracking-widest"
          >
            Đăng Nhập
          </p>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Register;
