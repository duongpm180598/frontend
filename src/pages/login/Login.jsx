import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import background from '../../asset/image/bg-01.webp';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { authActions } from '../../auth/auth.action';
import { useNavigate } from 'react-router-dom';

function LoginComponent() {
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
    authActions()
      .login(data)
      .then(() => {
        navigate('/');
      })
      .catch((e) => {
        alert(e);
        // setError(e);
      });
  };

  return (
    <div className="w-full h-full flex justify-center items-center p-4 fixed inset-0 z-10 bg-gray-50 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[500px] rounded-[10px] bg-gray-50 h-[90%] sm:px-[55px] sm:pt-[65px] sm:pb-[54px]"
      >
        <p className="font-Popins font-bold text-[39px] text-[#333] leading-[1.2] text-center pb-[49px]">Đăng Nhập</p>

        <div className="flex  flex-wrap border-b-2 mb-5 pb-[2px] relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-slate-600  after:transition-all after:ease-linear hover:after:w-full after:duration-500">
          <span className="text-sm text-[#333] font-Popins leading-[1.5]">Email</span>
          <div className="w-full flex justify-start items-center h-[55px] relative">
            <PersonIcon className="text-white absolute left-1 " />
            <input
              {...register('email', {
                required: 'Không để trống trường này',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Trường này phải là Email',
                },
              })}
              style={{
                color: 'white',
              }}
              placeholder="Nhập email của bạn"
              className="pl-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark: focus:bg-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
            />
          </div>
        </div>
        <div>
          {errors.email && (
            <span className="block text-sm font-Popins tracking-wider text-active">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-wrap border-b-2 mb-5 relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-slate-600  after:transition-all after:ease-linear hover:after:w-full after:duration-500">
          <span className="text-sm text-[#333] font-Popins leading-[1.5]">Mật Khẩu</span>
          <div className="w-full flex justify-start items-center h-[55px]  relative">
            <LockIcon className="text-white absolute left-1" />
            <input
              {...register('password', {
                required: 'Không để trống trường này',
                pattern: {
                  value: /^(?=.*?[a-z])(?=.*[@$!%*#?&])(?=.*?[0-9]).{8,}$/,
                  message: 'Ít nhất 8 ký tự, ít nhất: một chữ hoa, một chữ thường, một số và một ký tự đặc biết',
                },
              })}
              className="pl-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark: focus:bg-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nhập mật khẩu của bạn"
              type={visibalePass ? 'text' : 'password'}
            />
            <div className="cursor-pointer absolute right-1" onClick={() => setVisibalePass(!visibalePass)}>
              {visibalePass ? (
                <RemoveRedEyeOutlinedIcon className="text-white" />
              ) : (
                <VisibilityOffOutlinedIcon className="text-white" />
              )}
            </div>
          </div>
        </div>
        <div>
          {errors.password && (
            <span className="block text-sm font-Popins tracking-wider text-active">{errors.password.message}</span>
          )}
        </div>

        <div className="text-right pt-2 pb-8 w-full font-Popins"></div>

        <div className="cursor-pointer flex justify-center items-center rounded-[25px] bg-gradient-to-l from-gray-900 via-gray-400 to-gray-900 bg-200% hover:bg-right transition-all ease-in-out duration-700">
          <button className="uppercase tracking-[2px] w-full p-4 text-white" type="submit">
            Đăng Nhập
          </button>
        </div>

        <div className="text-center mt-10 font-Popins">
          <p className="text-sm text-[#666666]">Hoặc Đăng Ký</p>
          <p
            onClick={() => {
              navigate('/register');
            }}
            className="mt-5 text-[#333] cursor-pointer hover:opacity-90 tracking-widest"
          >
            Đăng Ký
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginComponent;
