import { PageType, UserInfoType } from "@/app/auth/page";
import { AppRoutes } from "@/lib/utils/constants/AppRoutes";
import { pageLabels } from "@/lib/utils/constants/pageLabels";
import { signIn } from "next-auth/react";
import { FormEvent, FormEventHandler, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

interface AuthFormProps {
  page: PageType;
  userInfo: UserInfoType;
  setUserInfo: (info: UserInfoType) => void;
  setPage: (page: PageType) => void;
}

export default function AuthForm(props: AuthFormProps) {
  const { page, userInfo, setPage, setUserInfo, ...formProps } = props;
  const { signInLabels, signUpLabels } = pageLabels;
  const [loading, setLoading] = useState(false);

  const handleLogin: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!userInfo.email || !userInfo.password) {
      return;
    }

    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email: userInfo.email,
        password: userInfo.password,
        callbackUrl: AppRoutes.Home,
        redirect: true,
      });

      if (res?.ok) {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handlePageChange = () => {
    if (page === "login") {
      setPage("register");
      return;
    }

    setPage("login");
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password } = userInfo;
    if (!name || !email || !password) {
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      console.log(res);

      if (res.ok) {
        // account registered
        setLoading(false);
        setPage("login");
      } else if (res.status === 409) {
        toast.error("🦄 User Already exists", {
          position: "top-right",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };
  return (
    <>
      <form
        onSubmit={page === "login" ? handleLogin : handleRegister}
        className="flex flex-col w-2/3 md:w-1/3 gap-2"
        {...formProps}
      >
        {page === "register" && (
          <input
            placeholder="name"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            className="input-primary"
            aria-label="Name"
          />
        )}

        <input
          value={userInfo.email}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, email: target.value })
          }
          type="email"
          placeholder="email@gmail.com"
          className="input-primary"
          aria-label="Email"
        />

        <input
          value={userInfo.password}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, password: target.value })
          }
          type="password"
          placeholder="********"
          className="input-primary"
          aria-label="Password"
        />

        <button
          disabled={loading}
          type="submit"
          className="btn-primary"
          aria-label={
            page === "login" ? signInLabels.event : signUpLabels.event
          }
        >
          {page === "login" ? signInLabels.event : signUpLabels.event}
        </button>

        {page === "login"}
        <p>
          {page === "login" ? signInLabels.formFooter : signUpLabels.formFooter}
          <span className="underline cursor-pointer" onClick={handlePageChange}>
            {page === "login" ? signUpLabels.event : signInLabels.event}
          </span>
        </p>
      </form>
    </>
  );
}
