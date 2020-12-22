const isDev = !process.env.NODE_ENV === 'production';

const formatPrice = value =>
  parseFloat(value).toLocaleString('pt-BR', {
    // Ajustando casas decimais
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    style: 'currency',
    currency: 'BRL',
  });

const appUtils = {
  formatPrice,
  isDev,
};

export default appUtils;
