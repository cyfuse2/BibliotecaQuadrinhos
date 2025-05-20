import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './Login.css'; // Importando o arquivo CSS
import { Link, useNavigate } from 'react-router-dom';
import heroesImage from '../../assets/heroes.png';
import heroes1 from '../../assets/heroes1.png'; 


const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email inválido').required('Email é obrigatório'),
    password: Yup.string().required('Senha é obrigatória'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setLoginError('');
      
      // Código de conexão com o servidor (temporariamente comentado)
      /*
      const response = await fetch('http://127.0.0.1:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('isAuthenticated', 'true');
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        window.dispatchEvent(new Event('storage'));
        navigate('/home');
      } else {
        const errorData = await response.json();
        setLoginError(errorData.message || 'Falha na autenticação. Verifique suas credenciais.');
      }
      */

      // Simulação temporária de login
      console.log('Dados de login:', values);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('token', 'token-simulado-123456');
      // Limpar a página atual para garantir que comece na página 1
      localStorage.removeItem('currentPage');
      window.dispatchEvent(new Event('storage'));
      navigate('/home');
      
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setLoginError('Erro de conexão com o servidor. Tente novamente mais tarde.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <h1 className="title">ESTANTE DE HEROIS</h1>
        <img src={heroesImage} alt="Heroes" className="heroes-image" />
      </div>
      <div className="auth-container">
        <h2>Bem-Vindo ao ESTANTE DE HEROIS</h2>
        
        {loginError && <div className="error-message" style={{color: 'red', marginBottom: '15px'}}>{loginError}</div>}
        
        <Formik
          initialValues={{ email: '', password: '' }} 
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div className="form-group">
                <Field name="email" type="email" placeholder="Email" className="form-control" />
                {errors.email && touched.email && <div className="error">{errors.email}</div>}
              </div>

              <div className="form-group">
                <Field name="password" type="password" placeholder="Senha" className="form-control" />
                {errors.password && touched.password && <div className="error">{errors.password}</div>}
              </div>

              <button type="submit" className="btn-submit" disabled={isSubmitting}>
                {isSubmitting ? 'Processando...' : 'Login'}
              </button>
              <Link to="/forgot-password" className="forgot-password">Recuperar senha</Link>
              
              <p style={{marginTop: '20px', textAlign: 'center'}}>
                Não tem uma conta? <Link to="/register" style={{fontWeight: 'bold'}}>Cadastre-se agora</Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
