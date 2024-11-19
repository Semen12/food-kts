export default (api) => {
  api.cache.using(() => process.env.NODE_ENV);
  const presets = ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'];
  const plugins = [
    process.env.NODE_ENV === 'development' && 'react-refresh/babel',
    ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-optional-chaining',
  
    
  ].filter(Boolean);
  
  return {
    presets,
    plugins
  };
};
