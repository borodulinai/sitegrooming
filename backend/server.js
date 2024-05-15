const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Создание подключения к базе данных
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Создание экземпляра Express
const app = express();

// 
app.use(cors({
  origin: '*' // Разрешить запросы с любого источника
}));

// Настройка транспорта nodemailer
const transporter = nodemailer.createTransport({
  service: 'yandex',
  auth: {
    user: process.env.EMAIL_USER, // почта
    pass: process.env.EMAIL_PASS // пароль приложений для почты
  }
});

// Настройка middleware для разбора тела POST-запроса
app.use(express.json());

// Обработка POST-запроса на '/submit-form'
app.post('/submit-form', (req, res) => {
const name = req.body.name;
const phone = req.body.phone;
const email = req.body.email;
  // Проверка, что поля не пустые
  if (!name || !phone || !email) {
    return res.status(400).json({ message: 'Все поля формы должны быть заполнены.' });
  }
const query = 'INSERT INTO klients (name, phone, email) VALUES (?, ?, ?)';

connection.query(query, [name, phone, email], (err, results) => {
   if (err) {
	console.error('Error saving user data:', err);
	return res.status(500).send('Ошибка сервера');
   }
   console.log('User data saved to the database:', results);

// Определение параметров письма
const mailOptions = {
   from: 'happydoggrumingsalon@yandex.ru',
   to: email, // Электронная почта клиента
   subject: 'Мы скоро свяжемся с вами!',
   text: `Уважаемый(ая) ${name},

   Мы благодарим вас за обращение в нашу компанию. Мы хотели бы уведомить вас, что в ближайшее время наш специалист свяжется с вами по телефону для обсуждения всех интересующих вас вопросов.

	Ваши данные для связи:
	Имя: ${name}
	Телефон: ${phone}
	Электронная почта: ${email}

	Если у вас есть какие-либо предпочтения относительно времени звонка или дополнительные вопросы, пожалуйста, сообщите нам об этом.

	С уважением,
	Груминг салон Happy dog`
};

 // Отправка электронного письма
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Ошибка отправки письма:', error);
        return res.status(500).json('Ошибка сервера при отправке письма');
      } else {
        console.log('Письмо отправлено: ' + info.response);
        return res.json('Письмо отправлено');
      }
    });
});
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
