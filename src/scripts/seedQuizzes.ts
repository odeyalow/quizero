import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

import { QuizDataType } from "@/types/QuizDataType";

export const seedQuizzes = async () => {

const quizzes: QuizDataType[] = [
  {
    isPublic: true,
    slug: "amazing-animals-world",
    title: "Удивительный мир животных",
    description: "Погрузитесь в захватывающий мир дикой природы! Узнайте интересные факты о поведении животных, их уникальных способностях и адаптации к окружающей среде.",
    coverImage: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    questionsAmount: 14,
    author: "Quizero",
    category: "nature",
    tags: ["животные", "дикая природа", "фауна", "биология"],
    questions: [
      {
        title: "Какое животное может изменять цвет своей кожи для маскировки?",
        image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        options: [
          { text: "Игуана", isCorrect: false },
          { text: "Хамелеон", isCorrect: true },
          { text: "Геккон", isCorrect: false },
          { text: "Варан", isCorrect: false }
        ]
      },
      {
        title: "Какое самое крупное млекопитающее в мире?",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        options: [
          { text: "Африканский слон", isCorrect: false },
          { text: "Синий кит", isCorrect: true },
          { text: "Белый медведь", isCorrect: false },
          { text: "Жираф", isCorrect: false }
        ]
      },
      {
        title: "Сколько лет может прожить гигантская черепаха?",
        image: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        options: [
          { text: "50-70 лет", isCorrect: false },
          { text: "80-100 лет", isCorrect: false },
          { text: "150+ лет", isCorrect: true },
          { text: "200+ лет", isCorrect: false }
        ]
      },
      {
        title: "Какая птица является символом мира?",
        image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        options: [
          { text: "Лебедь", isCorrect: false },
          { text: "Голубь", isCorrect: true },
          { text: "Орел", isCorrect: false },
          { text: "Сокол", isCorrect: false }
        ]
      },
      {
        title: "У какого животного самое острое зрение?",
        image: "https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        options: [
          { text: "Сова", isCorrect: false },
          { text: "Орел", isCorrect: true },
          { text: "Кот", isCorrect: false },
          { text: "Человек", isCorrect: false }
        ]
      },
      {
        title: "Какое животное спит больше всего в день?",
        image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        options: [
          { text: "Лев", isCorrect: false },
          { text: "Коала", isCorrect: true },
          { text: "Панда", isCorrect: false },
          { text: "Ленивец", isCorrect: false }
        ]
      },
      {
        title: "Какая рыба может генерировать электрический ток?",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        options: [
          { text: "Акула", isCorrect: false },
          { text: "Электрический угорь", isCorrect: true },
          { text: "Скат", isCorrect: false },
          { text: "Барракуда", isCorrect: false }
        ]
      },
      {
        title: "Какое животное может регенерировать потерянные конечности?",
        image: "https://images.unsplash.com/photo-1520637836862-4d197d17c735?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        options: [
          { text: "Саламандра", isCorrect: true },
          { text: "Лягушка", isCorrect: false },
          { text: "Змея", isCorrect: false },
          { text: "Черепаха", isCorrect: false }
        ]
      },
      {
        title: "Какая птица не умеет летать, но отлично плавает?",
        image: "https://images.unsplash.com/photo-1551986782-d0169b3f8fa7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        options: [
          { text: "Страус", isCorrect: false },
          { text: "Пингвин", isCorrect: true },
          { text: "Эму", isCorrect: false },
          { text: "Казуар", isCorrect: false }
        ]
      },
      {
        title: "У какого животного самый длинный язык относительно размера тела?",
        image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        options: [
          { text: "Жираф", isCorrect: false },
          { text: "Хамелеон", isCorrect: true },
          { text: "Муравьед", isCorrect: false },
          { text: "Лягушка", isCorrect: false }
        ]
      },
      {
        title: "Какое животное считается самым умным среди беспозвоночных?",
        image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        options: [
          { text: "Паук", isCorrect: false },
          { text: "Осьминог", isCorrect: true },
          { text: "Пчела", isCorrect: false },
          { text: "Муравей", isCorrect: false }
        ]
      },
      {
        title: "Какая змея самая длинная в мире?",
        image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        options: [
          { text: "Кобра", isCorrect: false },
          { text: "Анаконда", isCorrect: false },
          { text: "Сетчатый питон", isCorrect: true },
          { text: "Удав", isCorrect: false }
        ]
      },
      {
        title: "Какое животное может выжить в космосе?",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        options: [
          { text: "Таракан", isCorrect: false },
          { text: "Тихоходка", isCorrect: true },
          { text: "Бактерия", isCorrect: false },
          { text: "Скорпион", isCorrect: false }
        ]
      },
      {
        title: "У какого животного детеныши рождаются размером с рисовое зерно?",
        image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        options: [
          { text: "Панда", isCorrect: true },
          { text: "Коала", isCorrect: false },
          { text: "Кенгуру", isCorrect: false },
          { text: "Опоссум", isCorrect: false }
        ]
      }
    ]
  },
  {
    isPublic: true,
    slug: "plant-kingdom-secrets",
    title: "Тайны растительного мира",
    description: "Откройте для себя удивительные секреты растений! Узнайте о их уникальных способностях, адаптации и роли в экосистеме нашей планеты.",
    coverImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    questionsAmount: 12,
    author: "Quizero",
    category: "nature",
    tags: ["растения", "флора", "ботаника", "экосистема"],
    questions: [
      {
        title: "Какое дерево считается самым высоким в мире?",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        options: [
          { text: "Дуб", isCorrect: false },
          { text: "Секвойя", isCorrect: true },
          { text: "Эвкалипт", isCorrect: false },
          { text: "Сосна", isCorrect: false }
        ]
      },
      {
        title: "Какое растение поворачивается за солнцем в течение дня?",
        image: "https://images.unsplash.com/photo-1470509037663-253afd7f0f51?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        options: [
          { text: "Роза", isCorrect: false },
          { text: "Подсолнух", isCorrect: true },
          { text: "Тюльпан", isCorrect: false },
          { text: "Лилия", isCorrect: false }
        ]
      },
      {
        title: "Какое растение может жить дольше всего?",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        options: [
          { text: "Дуб", isCorrect: false },
          { text: "Баобаб", isCorrect: false },
          { text: "Сосна Мафусаил", isCorrect: true },
          { text: "Кедр", isCorrect: false }
        ]
      },
      {
        title: "Какое растение называют 'хищным'?",
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        options: [
          { text: "Кактус", isCorrect: false },
          { text: "Венерина мухоловка", isCorrect: true },
          { text: "Крапива", isCorrect: false },
          { text: "Роза", isCorrect: false }
        ]
      },
      {
        title: "Из какой части растения получают корицу?",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        options: [
          { text: "Листьев", isCorrect: false },
          { text: "Коры", isCorrect: true },
          { text: "Корней", isCorrect: false },
          { text: "Плодов", isCorrect: false }
        ]
      },
      {
        title: "Какое растение производит больше всего кислорода?",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        options: [
          { text: "Дуб", isCorrect: false },
          { text: "Эвкалипт", isCorrect: false },
          { text: "Фитопланктон", isCorrect: true },
          { text: "Сосна", isCorrect: false }
        ]
      },
      {
        title: "Какое растение может накапливать воду в своих листьях?",
        image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        options: [
          { text: "Папоротник", isCorrect: false },
          { text: "Кактус", isCorrect: false },
          { text: "Алоэ", isCorrect: true },
          { text: "Мох", isCorrect: false }
        ]
      },
      {
        title: "Какой фрукт технически является ягодой?",
        image: "https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        options: [
          { text: "Клубника", isCorrect: false },
          { text: "Банан", isCorrect: true },
          { text: "Малина", isCorrect: false },
          { text: "Ежевика", isCorrect: false }
        ]
      },
      {
        title: "Какое растение используется для производства текилы?",
        image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        options: [
          { text: "Кактус", isCorrect: false },
          { text: "Агава", isCorrect: true },
          { text: "Алоэ", isCorrect: false },
          { text: "Юкка", isCorrect: false }
        ]
      },
      {
        title: "Какую часть растения мы едим, когда едим картофель?",
        image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        options: [
          { text: "Корень", isCorrect: false },
          { text: "Стебель (клубень)", isCorrect: true },
          { text: "Лист", isCorrect: false },
          { text: "Семя", isCorrect: false }
        ]
      },
      {
        title: "Какое растение может 'ходить' перемещая свои корни?",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        options: [
          { text: "Баньян", isCorrect: false },
          { text: "Ходячая пальма", isCorrect: true },
          { text: "Манgrove", isCorrect: false },
          { text: "Фикус", isCorrect: false }
        ]
      },
      {
        title: "Какое растение цветет только ночью?",
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        options: [
          { text: "Роза", isCorrect: false },
          { text: "Царица ночи (кактус)", isCorrect: true },
          { text: "Лилия", isCorrect: false },
          { text: "Орхидея", isCorrect: false }
        ]
      }
    ]
  },
  {
    isPublic: true,
    slug: "weather-climate-phenomena",
    title: "Погода и климатические явления",
    description: "Исследуйте удивительный мир погоды и климата! Узнайте о природных явлениях, их причинах и влиянии на нашу планету и жизнь на Земле.",
    coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    questionsAmount: 11,
    author: "Quizero",
    category: "nature",
    tags: ["погода", "климат", "явления", "атмосфера"],
    questions: [
      {
        title: "Что вызывает образование радуги?",
        image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        options: [
          { text: "Отражение солнечного света от облаков", isCorrect: false },
          { text: "Преломление света в каплях воды", isCorrect: true },
          { text: "Магнитные поля Земли", isCorrect: false },
          { text: "Химические реакции в атмосфере", isCorrect: false }
        ]
      },
      {
        title: "Как называется самый сильный тип ветра?",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        options: [
          { text: "Торнадо", isCorrect: false },
          { text: "Ураган", isCorrect: true },
          { text: "Циклон", isCorrect: false },
          { text: "Шторм", isCorrect: false }
        ]
      },
      {
        title: "При какой температуре вода замерзает в градусах Цельсия?",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        options: [
          { text: "-1°C", isCorrect: false },
          { text: "0°C", isCorrect: true },
          { text: "1°C", isCorrect: false },
          { text: "2°C", isCorrect: false }
        ]
      },
      {
        title: "Что такое северное сияние?",
        image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        options: [
          { text: "Отражение льда в атмосфере", isCorrect: false },
          { text: "Взаимодействие солнечного ветра с магнитосферой", isCorrect: true },
          { text: "Свечение полярного льда", isCorrect: false },
          { text: "Электрические разряды в облаках", isCorrect: false }
        ]
      },
      {
        title: "Какая самая высокая зарегистрированная температура на Земле?",
        image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        options: [
          { text: "48°C", isCorrect: false },
          { text: "54°C", isCorrect: true },
          { text: "60°C", isCorrect: false },
          { text: "65°C", isCorrect: false }
        ]
      },
      {
        title: "Что измеряют в миллиметрах ртутного столба?",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        options: [
          { text: "Влажность", isCorrect: false },
          { text: "Атмосферное давление", isCorrect: true },
          { text: "Скорость ветра", isCorrect: false },
          { text: "Количество осадков", isCorrect: false }
        ]
      },
      {
        title: "В каких облаках образуется молния?",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        options: [
          { text: "Перистых", isCorrect: false },
          { text: "Кучевых", isCorrect: false },
          { text: "Грозовых (кучево-дождевых)", isCorrect: true },
          { text: "Слоистых", isCorrect: false }
        ]
      },
      {
        title: "Как называется прибор для измерения влажности воздуха?",
        image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        options: [
          { text: "Барометр", isCorrect: false },
          { text: "Гигрометр", isCorrect: true },
          { text: "Анемометр", isCorrect: false },
          { text: "Термометр", isCorrect: false }
        ]
      },
      {
        title: "Что вызывает образование тумана?",
        image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        options: [
          { text: "Высокая температура", isCorrect: false },
          { text: "Конденсация водяного пара", isCorrect: true },
          { text: "Сильный ветер", isCorrect: false },
          { text: "Низкое давление", isCorrect: false }
        ]
      },
      {
        title: "Какой газ создает парниковый эффект?",
        image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        options: [
          { text: "Азот", isCorrect: false },
          { text: "Кислород", isCorrect: false },
          { text: "Углекислый газ", isCorrect: true },
          { text: "Аргон", isCorrect: false }
        ]
      },
      {
        title: "Как называется циркуляция воды между океанами, атмосферой и сушей?",
        image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        options: [
          { text: "Круговорот воды", isCorrect: true },
          { text: "Водный цикл", isCorrect: false },
          { text: "Гидрологический процесс", isCorrect: false },
          { text: "Водообмен", isCorrect: false }
        ]
      }
    ]
  }
];

    try {
        for (const quiz of quizzes) {
            await addDoc(collection(db, 'quizzes'), quiz);
        }
        console.log('Quizzes added to firestore');
    } catch {
        console.log('There is an error occured while adding quizzes to firestore')
    }
}