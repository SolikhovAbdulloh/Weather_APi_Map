import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [Login, SetLogin] = useState("");
  const [Password, Setpassword] = useState("");

  const onFinish = () => {
    // if (Login === "havoyuli" && Password === "havo123yuli") {
    //   const user = { Login, Password };
    // localStorage.setItem("User", JSON.stringify(user));
    navigate("/map");
    // } else {
    //   alert("Noto'g'ri login yoki parol!");
    // }
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('your-airplane-image-url.jpg')` }}
    >
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-xl  max-w-md text-center">
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">Login</h3>
        <Form className="space-y-4" name="basic" onFinish={onFinish}>
          <Form.Item
            label="Login"
            name="Login"
            rules={[
              {
                required: true,
                message: "Please input your login!",
              },
            ]}
          >
            <Input
              className="w-full h-[40px] p-3 text-lg border rounded-md"
              onChange={(e) => SetLogin(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              className="w-full h-[40px]  p-3 text-lg border rounded-md"
              onChange={(e) => Setpassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item label={null}>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full py-3 text-lg bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
