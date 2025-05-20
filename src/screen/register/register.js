import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import '../login/Login.css';
import heroesImage from '../../assets/heroes.png';

const Register = () => {
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState('');

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    cpf: Yup.string()
      .required('CPF é obrigatório')
      .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/, 'CPF inválido. Use o formato 000.000.000-00 ou 00000000000'),
    address: Yup.string().required('Endereço é obrigatório'),
    email: Yup.string().email('Email inválido').required('Email é obrigatório'),
    password: Yup.string()
      .min(6, 'A senha deve ter pelo menos 6 caracteres')
      .required('Senha é obrigatória'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'As senhas não conferem')
      .required('Confirmação de senha é obrigatória'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setRegisterError('');
      // Remover confirmPassword antes de enviar para a API
      const { confirmPassword, ...dataToSend } = values;
      
      // Código de conexão com o servidor (temporariamente comentado)
      /*
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        alert('Cadastro realizado com sucesso!');
        navigate('/login');
      } else {
        const errorData = await response.json();
        setRegisterError(errorData.message || 'Erro ao cadastrar. Verifique os dados e tente novamente.');
      }
      */

      // Simulação temporária de cadastro
      console.log('Dados de cadastro:', dataToSend);
      alert('Cadastro realizado com sucesso!');
      navigate('/login');
      
    } catch (error) {
      console.error('Erro ao registrar:', error);
      setRegisterError('Erro de conexão com o servidor. Tente novamente mais tarde.');
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
        <h2>Cadastre-se</h2>
        
        {registerError && <div className="error-message" style={{color: 'red', marginBottom: '15px'}}>{registerError}</div>}
        
        <Formik
          initialValues={{ 
            name: '', 
            cpf: '', 
            address: '', 
            email: '', 
            password: '', 
            confirmPassword: '' 
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div className="form-group">
                <Field name="name" type="text" placeholder="Nome completo" className="form-control" />
                {errors.name && touched.name && <div className="error">{errors.name}</div>}
              </div>

              <div className="form-group">
                <Field name="cpf" type="text" placeholder="CPF (000.000.000-00)" className="form-control" />
                {errors.cpf && touched.cpf && <div className="error">{errors.cpf}</div>}
              </div>

              <div className="form-group">
                <Field name="address" type="text" placeholder="Endereço completo" className="form-control" />
                {errors.address && touched.address && <div className="error">{errors.address}</div>}
              </div>

              <div className="form-group">
                <Field name="email" type="email" placeholder="Email" className="form-control" />
                {errors.email && touched.email && <div className="error">{errors.email}</div>}
              </div>

              <div className="form-group">
                <Field name="password" type="password" placeholder="Senha" className="form-control" />
                {errors.password && touched.password && <div className="error">{errors.password}</div>}
              </div>

              <div className="form-group">
                <Field name="confirmPassword" type="password" placeholder="Confirmar Senha" className="form-control" />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="error">{errors.confirmPassword}</div>
                )}
              </div>

              <button type="submit" className="btn-submit" disabled={isSubmitting}>
                {isSubmitting ? 'Processando...' : 'Cadastrar'}
              </button>
              <p>
                Já tem uma conta? <Link to="/login">Faça login</Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;