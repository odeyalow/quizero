import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

import { QuizDataType } from "@/types/QuizDataType";

export const seedQuizzes = async () => {

const quizzes: QuizDataType[] = [
  {
    isPublic: true,
    slug: "hollywood-classics",
    title: "Классика Голливуда",
    description: "Проверьте свои знания о величайших фильмах золотой эры Голливуда и современной классике",
    coverImage: "https://images.unsplash.com/photo-1489599096842-824e8de2c72a?w=800&h=600&fit=crop",
    questionsAmount: 12,
    author: "Quizero",
    category: "cinema",
    tags: ["классика", "голливуд", "история кино", "легенды"],
    questions: [
      {
        title: "Кто сыграл главную роль в фильме 'Касабланка' (1942)?",
        image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=600&h=400&fit=crop",
        options: [
          { text: "Хамфри Богарт", isCorrect: true },
          { text: "Кэри Грант", isCorrect: false },
          { text: "Джеймс Стюарт", isCorrect: false },
          { text: "Кларк Гейбл", isCorrect: false }
        ]
      },
      {
        title: "Какой фильм получил Оскар за лучший фильм в 1994 году?",
        image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=600&h=400&fit=crop",
        options: [
          { text: "Список Шиндлера", isCorrect: true },
          { text: "Побег из Шоушенка", isCorrect: false },
          { text: "Форrest Гамп", isCorrect: false },
          { text: "Криминальное чтиво", isCorrect: false }
        ]
      },
      {
        title: "Кто режиссер трилогии 'Крестный отец'?",
        image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=600&h=400&fit=crop",
        options: [
          { text: "Фрэнсис Форд Коппола", isCorrect: true },
          { text: "Мартин Скорсезе", isCorrect: false },
          { text: "Стивен Спилберг", isCorrect: false },
          { text: "Джордж Лукас", isCorrect: false }
        ]
      },
      {
        title: "В каком году вышел фильм 'Звездные войны: Новая надежда'?",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
        options: [
          { text: "1977", isCorrect: true },
          { text: "1975", isCorrect: false },
          { text: "1979", isCorrect: false },
          { text: "1980", isCorrect: false }
        ]
      },
      {
        title: "Кто сыграл Дороти в фильме 'Волшебник страны Оз' (1939)?",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
        options: [
          { text: "Джуди Гарланд", isCorrect: true },
          { text: "Грейс Келли", isCorrect: false },
          { text: "Ингрид Бергман", isCorrect: false },
          { text: "Кэтрин Хепберн", isCorrect: false }
        ]
      },
      {
        title: "Какой фильм Альфреда Хичкока считается его шедевром о птицах?",
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop",
        options: [
          { text: "Птицы", isCorrect: true },
          { text: "Психо", isCorrect: false },
          { text: "Головокружение", isCorrect: false },
          { text: "Окно во двор", isCorrect: false }
        ]
      },
      {
        title: "Кто сыграл Скарлетт О'Хара в 'Унесенных ветром'?",
        image: "https://images.unsplash.com/photo-1489599096842-824e8de2c72a?w=600&h=400&fit=crop",
        options: [
          { text: "Вивьен Ли", isCorrect: true },
          { text: "Джин Харлоу", isCorrect: false },
          { text: "Бетт Дэвис", isCorrect: false },
          { text: "Джоан Кроуфорд", isCorrect: false }
        ]
      },
      {
        title: "Какой актер сыграл главную роль в 'Гражданине Кейне'?",
        image: "https://images.unsplash.com/photo-1489599096842-824e8de2c72a?w=600&h=400&fit=crop",
        options: [
          { text: "Орсон Уэллс", isCorrect: true },
          { text: "Джеймс Кэгни", isCorrect: false },
          { text: "Спенсер Трейси", isCorrect: false },
          { text: "Уильям Хольден", isCorrect: false }
        ]
      },
      {
        title: "В каком году вышел первый фильм о Джеймсе Бонде с Шоном Коннери?",
        image: "https://images.unsplash.com/photo-1571847140471-1d7766e825ea?w=600&h=400&fit=crop",
        options: [
          { text: "1962", isCorrect: true },
          { text: "1960", isCorrect: false },
          { text: "1964", isCorrect: false },
          { text: "1965", isCorrect: false }
        ]
      },
      {
        title: "Кто режиссер фильма 'Апокалипсис сегодня'?",
        image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=600&h=400&fit=crop",
        options: [
          { text: "Фрэнсис Форд Коппола", isCorrect: true },
          { text: "Майкл Чимино", isCorrect: false },
          { text: "Оливер Стоун", isCorrect: false },
          { text: "Стэнли Кубрик", isCorrect: false }
        ]
      },
      {
        title: "Какой фильм получил 11 Оскаров в 1960 году?",
        image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=600&h=400&fit=crop",
        options: [
          { text: "Бен-Гур", isCorrect: true },
          { text: "Лоуренс Аравийский", isCorrect: false },
          { text: "Мост через реку Квай", isCorrect: false },
          { text: "Вестсайдская история", isCorrect: false }
        ]
      },
      {
        title: "Кто сыграл Рокки Бальбоа в одноименной серии фильмов?",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
        options: [
          { text: "Сильвестр Сталлоне", isCorrect: true },
          { text: "Арнольд Шварценеггер", isCorrect: false },
          { text: "Роберт Де Ниро", isCorrect: false },
          { text: "Аль Пачино", isCorrect: false }
        ]
      }
    ]
  },
  {
    isPublic: true,
    slug: "modern-cinema-blockbusters",
    title: "Современные блокбастеры",
    description: "Тест на знание популярных фильмов 2000-х и 2010-х годов, супергероев и франшиз",
    coverImage: "https://images.unsplash.com/photo-1489599096842-824e8de2c72a?w=800&h=600&fit=crop",
    questionsAmount: 15,
    author: "Quizero",
    category: "cinema",
    tags: ["блокбастеры", "современное кино", "супергерои", "франшизы"],
    questions: [
      {
        title: "Кто сыграл Железного человека в киновселенной Marvel?",
        image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&h=400&fit=crop",
        options: [
          { text: "Роберт Дауни младший", isCorrect: true },
          { text: "Крис Эванс", isCorrect: false },
          { text: "Крис Хемсворт", isCorrect: false },
          { text: "Марк Руффало", isCorrect: false }
        ]
      },
      {
        title: "Какой фильм стал самым кассовым в истории кинематографа?",
        image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=600&h=400&fit=crop",
        options: [
          { text: "Аватар", isCorrect: true },
          { text: "Мстители: Финал", isCorrect: false },
          { text: "Титаник", isCorrect: false },
          { text: "Звездные войны: Пробуждение силы", isCorrect: false }
        ]
      },
      {
        title: "Кто режиссер трилогии 'Темный рыцарь'?",
        image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=600&h=400&fit=crop",
        options: [
          { text: "Кристофер Нолан", isCorrect: true },
          { text: "Зак Снайдер", isCorrect: false },
          { text: "Тим Бертон", isCorrect: false },
          { text: "Сэм Рэйми", isCorrect: false }
        ]
      },
      {
        title: "В каком году вышел первый фильм 'Гарри Поттер'?",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
        options: [
          { text: "2001", isCorrect: true },
          { text: "2000", isCorrect: false },
          { text: "2002", isCorrect: false },
          { text: "1999", isCorrect: false }
        ]
      },
      {
        title: "Кто сыграл Джокера в фильме 'Темный рыцарь' (2008)?",
        image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&h=400&fit=crop",
        options: [
          { text: "Хит Леджер", isCorrect: true },
          { text: "Джек Николсон", isCorrect: false },
          { text: "Хоакин Феникс", isCorrect: false },
          { text: "Джаред Лето", isCorrect: false }
        ]
      },
      {
        title: "Какой фильм положил начало киновселенной Marvel?",
        image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&h=400&fit=crop",
        options: [
          { text: "Железный человек", isCorrect: true },
          { text: "Тор", isCorrect: false },
          { text: "Первый мститель", isCorrect: false },
          { text: "Невероятный Халк", isCorrect: false }
        ]
      },
      {
        title: "Кто режиссер фильма 'Начало' (Inception)?",
        image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=600&h=400&fit=crop",
        options: [
          { text: "Кристофер Нолан", isCorrect: true },
          { text: "Дени Вильнёв", isCorrect: false },
          { text: "Райан Джонсон", isCorrect: false },
          { text: "Джеймс Кэмерон", isCorrect: false }
        ]
      },
      {
        title: "Сколько фильмов входит в основную сагу 'Звездных войн'?",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
        options: [
          { text: "9", isCorrect: true },
          { text: "6", isCorrect: false },
          { text: "8", isCorrect: false },
          { text: "12", isCorrect: false }
        ]
      },
      {
        title: "Кто сыграл Неда Старка в сериале 'Игра престолов'?",
        image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=600&h=400&fit=crop",
        options: [
          { text: "Шон Бин", isCorrect: true },
          { text: "Марк Эдди", isCorrect: false },
          { text: "Чарльз Дэнс", isCorrect: false },
          { text: "Лиам Каннингэм", isCorrect: false }
        ]
      },
      {
        title: "В каком году вышел фильм 'Мстители: Финал'?",
        image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&h=400&fit=crop",
        options: [
          { text: "2019", isCorrect: true },
          { text: "2018", isCorrect: false },
          { text: "2020", isCorrect: false },
          { text: "2017", isCorrect: false }
        ]
      },
      {
        title: "Кто режиссер фильма 'Джокер' (2019)?",
        image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=600&h=400&fit=crop",
        options: [
          { text: "Тодд Филлипс", isCorrect: true },
          { text: "Мэтт Ривз", isCorrect: false },
          { text: "Дэвид Финчер", isCorrect: false },
          { text: "Кристофер Нолан", isCorrect: false }
        ]
      },
      {
        title: "Какой актер сыграл Волан-де-Морта в фильмах о Гарри Поттере?",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
        options: [
          { text: "Рэйф Файнс", isCorrect: true },
          { text: "Алан Рикман", isCorrect: false },
          { text: "Джейсон Айзекс", isCorrect: false },
          { text: "Том Фелтон", isCorrect: false }
        ]
      },
      {
        title: "Сколько фильмов 'Форсаж' вышло на экраны (основная серия)?",
        image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop",
        options: [
          { text: "10", isCorrect: true },
          { text: "8", isCorrect: false },
          { text: "9", isCorrect: false },
          { text: "11", isCorrect: false }
        ]
      },
      {
        title: "Кто сыграл главную роль в фильме 'Джон Уик'?",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
        options: [
          { text: "Киану Ривз", isCorrect: true },
          { text: "Том Круз", isCorrect: false },
          { text: "Джейсон Стэйтем", isCorrect: false },
          { text: "Лиам Нисон", isCorrect: false }
        ]
      },
      {
        title: "Какой фильм Pixar рассказывает о роботе, оставшемся на Земле?",
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop",
        options: [
          { text: "ВАЛЛ-И", isCorrect: true },
          { text: "Рататуй", isCorrect: false },
          { text: "В поисках Немо", isCorrect: false },
          { text: "Корпорация монстров", isCorrect: false }
        ]
      }
    ]
  },
  {
    isPublic: true,
    slug: "directors-and-actors",
    title: "Режиссеры и актеры",
    description: "Проверьте, насколько хорошо вы знаете знаменитых режиссеров, актеров и их фильмографию",
    coverImage: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=600&fit=crop",
    questionsAmount: 13,
    author: "Quizero",
    category: "cinema",
    tags: ["режиссеры", "актеры", "биографии", "фильмография", "звезды"],
    questions: [
      {
        title: "Кто из режиссеров снял фильмы 'Криминальное чтиво' и 'Убить Билла'?",
        image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=600&h=400&fit=crop",
        options: [
          { text: "Квентин Тарантино", isCorrect: true },
          { text: "Роберт Родригес", isCorrect: false },
          { text: "Кристофер Нолан", isCorrect: false },
          { text: "Дэвид Финчер", isCorrect: false }
        ]
      },
      {
        title: "Какая актриса получила Оскар за роль в фильме 'Ла-Ла Ленд'?",
        image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=600&h=400&fit=crop",
        options: [
          { text: "Эмма Стоун", isCorrect: true },
          { text: "Эмма Уотсон", isCorrect: false },
          { text: "Райан Гослинг", isCorrect: false },
          { text: "Эми Адамс", isCorrect: false }
        ]
      },
      {
        title: "Кто режиссер фильмов 'Такси Driver' и 'Славные парни'?",
        image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=600&h=400&fit=crop",
        options: [
          { text: "Мартин Скорсезе", isCorrect: true },
          { text: "Фрэнсис Форд Коппола", isCorrect: false },
          { text: "Сидни Люмет", isCorrect: false },
          { text: "Вуди Аллен", isCorrect: false }
        ]
      },
      {
        title: "Какой актер сыграл главные роли в фильмах 'Форест Гамп' и 'Филадельфия'?",
        image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=600&h=400&fit=crop",
        options: [
          { text: "Том Хэнкс", isCorrect: true },
          { text: "Том Круз", isCorrect: false },
          { text: "Кевин Костнер", isCorrect: false },
          { text: "Мэтт Дэймон", isCorrect: false }
        ]
      },
      {
        title: "Кто снял фильм 'Интерстеллар'?",
        image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=600&h=400&fit=crop",
        options: [
          { text: "Кристофер Нолан", isCorrect: true },
          { text: "Ридли Скотт", isCorrect: false },
          { text: "Дени Вильнёв", isCorrect: false },
          { text: "Альфонсо Куарон", isCorrect: false }
        ]
      },
      {
        title: "Какая актриса получила наибольшее количество номинаций на Оскар?",
        image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=600&h=400&fit=crop",
        options: [
          { text: "Мерил Стрип", isCorrect: true },
          { text: "Кэтрин Хепберн", isCorrect: false },
          { text: "Бетт Дэвис", isCorrect: false },
          { text: "Джуди Денч", isCorrect: false }
        ]
      },
      {
        title: "Кто режиссер фильма 'Властелин колец: Возвращение короля'?",
        image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=600&h=400&fit=crop",
        options: [
          { text: "Питер Джексон", isCorrect: true },
          { text: "Гильермо дель Торо", isCorrect: false },
          { text: "Сэм Рэйми", isCorrect: false },
          { text: "Джеймс Кэмерон", isCorrect: false }
        ]
      },
      {
        title: "В скольких фильмах сыграл Роберт Де Ниро под руководством Мартина Скорсезе?",
        image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=600&h=400&fit=crop",
        options: [
          { text: "9", isCorrect: true },
          { text: "6", isCorrect: false },
          { text: "8", isCorrect: false },
          { text: "12", isCorrect: false }
        ]
      },
      {
        title: "Кто снял фильм 'Бегущий по лезвию 2049'?",
        image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=600&h=400&fit=crop",
        options: [
          { text: "Дени Вильнёв", isCorrect: true },
          { text: "Ридли Скотт", isCorrect: false },
          { text: "Кристофер Нолан", isCorrect: false },
          { text: "Альфонсо Куарон", isCorrect: false }
        ]
      },
      {
        title: "Какой актер получил Оскар за роль в фильме 'Джокер' (2019)?",
        image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=600&h=400&fit=crop",
        options: [
          { text: "Хоакин Феникс", isCorrect: true },
          { text: "Адам Драйвер", isCorrect: false },
          { text: "Леонардо Ди Каприо", isCorrect: false },
          { text: "Кристиан Бейл", isCorrect: false }
        ]
      },
      {
        title: "Кто режиссер фильма 'Зеленая миля'?",
        image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=600&h=400&fit=crop",
        options: [
          { text: "Фрэнк Дарабонт", isCorrect: true },
          { text: "Роб Райнер", isCorrect: false },
          { text: "Джордж Клуни", isCorrect: false },
          { text: "Рон Ховард", isCorrect: false }
        ]
      },
      {
        title: "Какая актриса сыграла Елизавету II в фильме 'Королева' (2006)?",
        image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=600&h=400&fit=crop",
        options: [
          { text: "Хелен Миррен", isCorrect: true },
          { text: "Джуди Денч", isCorrect: false },
          { text: "Тильда Суинтон", isCorrect: false },
          { text: "Кейт Бланшетт", isCorrect: false }
        ]
      },
      {
        title: "Сколько Оскаров получил фильм 'Властелин колец: Возвращение короля'?",
        image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=600&h=400&fit=crop",
        options: [
          { text: "11", isCorrect: true },
          { text: "9", isCorrect: false },
          { text: "13", isCorrect: false },
          { text: "8", isCorrect: false }
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