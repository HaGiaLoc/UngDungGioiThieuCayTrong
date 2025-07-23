exports.login = (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin123') {
    return res.json({ token: 'sample_admin_token' });
  } else {
    return res.status(401).json({ message: 'Sai tài khoản hoặc mật khẩu' });
  }
}; 