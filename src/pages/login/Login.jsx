import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../../auth/auth.action';

function LoginComponent() {
  const [visibalePass, setVisibalePass] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    authActions()
      .login(data)
      .then(() => {
        navigate('/');
      })
      .catch((e) => {
        alert(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-full h-full flex justify-center items-center p-4 fixed inset-0 z-10 bg-gray-50 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[500px] rounded-[10px] bg-gray-50 h-[90%] sm:px-[55px] sm:pt-[65px] sm:pb-[54px]"
      >
        <p className="font-Popins font-bold text-[39px] text-[#333] leading-[1.2] text-center pb-[49px]">Đăng Nhập</p>

        <div className="flex  flex-wrap mb-5 pb-[2px] relative">
          <span className="text-sm text-[#333] font-Popins leading-[1.5]">Email</span>
          <div className="w-full flex justify-start items-center h-[55px] relative">
            <PersonIcon className="text-gray-900 absolute left-1 " />
            <input
              {...register('email', {
                required: 'Không để trống trường này',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Trường này phải là Email',
                },
              })}
              placeholder="Nhập email của bạn"
              className="pl-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
            />
          </div>
        </div>
        <div>
          {errors.email && (
            <span className="block text-sm font-Popins tracking-wider text-active">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-wrap mb-5 relative">
          <span className="text-sm text-[#333] font-Popins leading-[1.5]">Mật Khẩu</span>
          <div className="w-full flex justify-start items-center h-[55px]  relative">
            <LockIcon className="text-gray-900 absolute left-1" />
            <input
              {...register('password', {
                required: 'Không để trống trường này',
                pattern: {
                  value: /^(?=.*?[a-z])(?=.*[@$!%*#?&])(?=.*?[0-9]).{8,}$/,
                  message: 'Ít nhất 8 ký tự, ít nhất: một chữ hoa, một chữ thường, một số và một ký tự đặc biết',
                },
              })}
              className="pl-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  block w-full p-2.5  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nhập mật khẩu của bạn"
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
            <span className="block text-sm font-Popins tracking-wider text-active">{errors.password.message}</span>
          )}
        </div>

        <div className="text-right pt-2 pb-8 w-full font-Popins"></div>

        <div className="cursor-pointer flex justify-center items-center rounded-[25px] bg-gray-900 transition-all ease-in-out duration-700">
          <button className="uppercase tracking-[2px] w-full p-4 text-white" type="submit" disabled={loading}>
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
