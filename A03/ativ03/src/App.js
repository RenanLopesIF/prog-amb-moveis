import React, { useState } from 'react';

const App = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
  });

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    console.log('Nome:', formData.nome);
    console.log('E-mail:', formData.email);
  };

  return (
    <div>
      <h2>Formulário Simples</h2>
      <form>
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={formData.nome}
          onChange={(e) => handleChange('nome', e.target.value)}
          required
        />

        <br />

        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          required
        />

        <br />

        <button type="button" onClick={handleSubmit}>
          Enviar
        </button>
      </form>
    </div>
  );
};

export default App;
