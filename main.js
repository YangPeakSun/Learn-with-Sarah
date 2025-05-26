// Global Variables
let initialCurrentUserState = {
  name: "",
  age: 0,
  avatar: "🐶", 
  points: 0,
  grade: 1,
  dailyQuizCount: 0,
  totalQuizzes: 0,
  correctAnswers: 0,
  completedTasks: [],
  pets: [], 
  achievements: [],
  streak: 0,
  lastLoginDate: null,
  perfectScores: 0,
  settings: {
    font: "Inter",
    fontSize: "normal",
    backgroundColor: "default",
    sound: true,
  },
};

let currentUser = JSON.parse(JSON.stringify(initialCurrentUserState));

let currentQuiz = {
  questions: [],
  currentQuestion: 0,
  score: 0,
  answers: [],
};

// API Configuration
const GEMINI_API_KEY = "AIzaSyBF4ZRiD2JHIZy2Z1XIv4rRytTjmgf_gkk"; 
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

// Shop Items Data
const shopItems = {
  pets: [
    {
      id: "nemo",
      name: "Cá hề Nemo",
      icon: "images/nemo.png",
      price: 50,
      level: 1,
      isImage: true,
      description: "Chú cá hề dễ thương và thân thiện",
    },
    {
      id: "shark",
      name: "Cá mập",
      icon: "images/shark.png",
      price: 200,
      level: 2,
      pieces: 2,
      isImage: true,
      description: "Cá mập mạnh mẽ và dũng cảm",
    },
    {
      id: "dolphin",
      name: "Cá heo",
      icon: "images/dolphin.png",
      price: 200,
      level: 2,
      pieces: 2,
      isImage: true,
      description: "Cá heo thông minh và vui tươi",
    },
    {
      id: "octopus",
      name: "Bạch tuộc",
      icon: "images/octopus.png",
      price: 200,
      level: 2,
      pieces: 2,
      isImage: true,
      description: "Bạch tuộc thông minh với 8 cánh tay",
    },
    {
      id: "jellyfish",
      name: "Sứa",
      icon: "images/jellyfish.png",
      price: 200,
      level: 2,
      pieces: 2,
      isImage: true,
      description: "Sứa lấp lánh như kim cương",
    },
    {
      id: "ballerina",
      name: "Ballerina Cappuccina",
      icon: "images/ballerina-cappuccina.png",
      price: 1000,
      level: 3,
      pieces: 4,
      isImage: true,
      description: "Nữ hoàng ballet của biển cả",
    },
    {
      id: "bombardiro",
      name: "Bombardiro Crocodilo",
      icon: "images/bombardiro-crocodilo.png",
      price: 1000,
      level: 3,
      pieces: 4,
      isImage: true,
      description: "Cá sấu chiến binh huyền thoại",
    },
    {
      id: "sahur",
      name: "Tung Tung Sahur",
      icon: "images/tung-tung-sahur.png",
      price: 1000,
      level: 3,
      pieces: 4,
      isImage: true,
      description: "Nhân vật bí ẩn từ vùng đất xa",
    },
    {
      id: "tralala",
      name: "Tralalero Tralala",
      icon: "images/tralalero-tralala.png",
      price: 1000,
      level: 3,
      pieces: 4,
      isImage: true,
      description: "Ca sĩ nổi tiếng của đại dương",
    },
  ],
  accessories: [
    { id: "hat", name: "Mũ xinh", icon: "🎩", price: 30 * 10, description: "Mũ thời trang cho thú cưng" },
    { id: "crown", name: "Vương miện", icon: "👑", price: 50 * 10, description: "Vương miện hoàng gia" },
    { id: "backpack", name: "Ba lô", icon: "🎒", price: 40 * 10, description: "Ba lô đựng đồ chơi" },
    { id: "shoes", name: "Giày thể thao", icon: "👟", price: 35 * 10, description: "Giày chạy bộ tốc độ" },
    { id: "sword", name: "Kiếm thần", icon: "⚔️", price: 60 * 10, description: "Kiếm của các chiến binh" },
    { id: "shield", name: "Khiên bảo vệ", icon: "🛡️", price: 55 * 10, description: "Khiên phòng thủ mạnh mẽ" },
  ],
  food: [
    { id: "fish", name: "Cá tươi", icon: "🐟", price: 20, description: "Cá tươi ngon bổ dưỡng" },
    { id: "meat", name: "Thịt ngon", icon: "🥩", price: 25, description: "Thịt chất lượng cao" },
    { id: "water", name: "Nước sạch", icon: "💧", price: 15, description: "Nước tinh khiết" },
    { id: "milk", name: "Sữa tươi", icon: "🥛", price: 30, description: "Sữa giàu canxi" },
    { id: "cookie", name: "Bánh quy", icon: "🍪", price: 25, description: "Bánh quy thơm ngon" },
    { id: "apple", name: "Táo đỏ", icon: "🍎", price: 20, description: "Táo tươi giàu vitamin" },
  ],
};

// Flag Game Data
const flagData = [
  { flag: "🇻🇳", country: "Việt Nam", options: ["Việt Nam", "Thái Lan", "Lào", "Campuchia"] },
  { flag: "🇺🇸", country: "Mỹ", options: ["Mỹ", "Canada", "Mexico", "Brazil"] },
  { flag: "🇯🇵", country: "Nhật Bản", options: ["Nhật Bản", "Hàn Quốc", "Trung Quốc", "Thái Lan"] },
  { flag: "🇫🇷", country: "Pháp", options: ["Pháp", "Đức", "Ý", "Tây Ban Nha"] },
  { flag: "🇬🇧", country: "Anh", options: ["Anh", "Ireland", "Scotland", "Wales"] },
  { flag: "🇰🇷", country: "Hàn Quốc", options: ["Hàn Quốc", "Nhật Bản", "Trung Quốc", "Việt Nam"] },
  { flag: "🇨🇳", country: "Trung Quốc", options: ["Trung Quốc", "Nhật Bản", "Hàn Quốc", "Việt Nam"] },
  { flag: "🇹🇭", country: "Thái Lan", options: ["Thái Lan", "Việt Nam", "Lào", "Myanmar"] },
  { flag: "🇦🇺", country: "Úc", options: ["Úc", "New Zealand", "Canada", "Nam Phi"] },
  { flag: "🇧🇷", country: "Brazil", options: ["Brazil", "Argentina", "Chile", "Peru"] },
];

// Achievement Definitions
const achievementDefinitions = {
  helper: {
    name: "Báo thủ của Mẹ",
    description: "Mua thú cưng cấp 1",
    icon: "🏅",
    requirement: "pet_level_1",
  },
  golden: {
    name: "Cục vàng của mẹ",
    description: "Mua thú cưng cấp 2",
    icon: "🥇",
    requirement: "pet_level_2",
  },
  diamond: {
    name: "Cục hột xoàn của mẹ",
    description: "Mua thú cưng cấp 3",
    icon: "💎",
    requirement: "pet_level_3",
  },
  scholar: {
    name: "Học giả nhí",
    description: "Hoàn thành 10 bộ đề",
    icon: "📚",
    requirement: "quiz_count_10",
  },
  perfectionist: {
    name: "Người hoàn hảo",
    description: "Đạt điểm tuyệt đối 3 lần",
    icon: "⭐",
    requirement: "perfect_score_3",
  },
};

// Performance Metrics
const performanceMetrics = {
  startTime: performance.now(),
  questionsGenerated: 0,
  errorsEncountered: 0,
};

let selectedAccessoryToAssign = null; 

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Khởi động ứng dụng học tập Sarah...");
  loadUserData();
  initializeEventListeners();
  checkDailyReset();
  updateStreakCounter(); 
  showWelcomePopup();
});

// Event Listeners
function initializeEventListeners() {
  console.log("🔧 Thiết lập event listeners...");

  // Welcome flow
  document.getElementById("startBtn").addEventListener("click", showAvatarSelection);
  document.getElementById("confirmAvatar").addEventListener("click", showNameInput);
  document.getElementById("confirmName").addEventListener("click", showAgeInput);
  document.getElementById("confirmAge").addEventListener("click", showMainApp);

  // Navigation
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const section = e.target.dataset.section || e.target.closest(".nav-btn").dataset.section;
        if (section) switchSection(section);
    });
  });


  // Quiz functionality
  document.getElementById("startNewQuiz").addEventListener("click", showGradeSelection);
  document.getElementById("startQuiz").addEventListener("click", startQuiz);
  document.getElementById("nextQuestion").addEventListener("click", nextQuestion);
  document.getElementById("backToHome").addEventListener("click", () => {
    hidePopup("resultsPopup");
    switchSection("home");
  });

  // Mini game
  document.getElementById("playMiniGame").addEventListener("click", startMiniGame);
  document.getElementById("closeMiniGame").addEventListener("click", () => hidePopup("miniGamePopup"));

  // Avatar selection
  document.querySelectorAll(".avatar-option").forEach((option) => {
    option.addEventListener("click", selectAvatar);
  });

  // Grade selection
  document.querySelectorAll(".grade-option").forEach((option) => {
    option.addEventListener("click", selectGrade);
  });

  // Tasks
  document.querySelectorAll('.task-item input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener("change", updateTaskProgress);
  });

  // Chat
  document.getElementById("chatBtn").addEventListener("click", toggleChat);
  document.getElementById("closeChatBtn").addEventListener("click", toggleChat);
  document.getElementById("sendChatBtn").addEventListener("click", sendChatMessage);
  document.getElementById("chatInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) { 
        e.preventDefault(); 
        sendChatMessage();
    }
  });

  // Settings
  document.getElementById("settingsBtn").addEventListener("click", () => showPopup("settingsPopup"));
  document.getElementById("closeSettings").addEventListener("click", () => hidePopup("settingsPopup"));
  document.getElementById("fontSelect").addEventListener("change", updateSettings);
  document.getElementById("fontSizeSelect").addEventListener("change", updateSettings);
  document.getElementById("soundToggle").addEventListener("change", updateSettings);
  document.getElementById("logoutBtn").addEventListener("click", logoutUser);


  // Color options
  document.querySelectorAll(".color-option").forEach((option) => {
    option.addEventListener("click", selectColor);
  });

  // Shop categories
  document.querySelectorAll(".category-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => switchShopCategory(e.target.dataset.category));
  });

  // Pet emotion
  document.getElementById("petEmotion").addEventListener("click", showPetInteraction);

  // Assign Accessory Popup Listeners
  const confirmAssignBtn = document.getElementById("confirmAssignAccessory");
  if (confirmAssignBtn) confirmAssignBtn.addEventListener("click", confirmAssignAccessoryToPet);
  
  const cancelAssignBtn = document.getElementById("cancelAssignAccessory");
  if (cancelAssignBtn) {
      cancelAssignBtn.addEventListener("click", () => {
          if (selectedAccessoryToAssign) {
              showNotification(`Đã hủy gắn ${selectedAccessoryToAssign.name}. Phụ kiện chưa được sử dụng.`, "info");
          }
          hidePopup("assignAccessoryPopup");
          selectedAccessoryToAssign = null;
      });
  }


  console.log("✅ Event listeners đã được thiết lập!");
}

function logoutUser() {
    currentUser = JSON.parse(JSON.stringify(initialCurrentUserState));
    
    document.getElementById("mainApp").style.display = "none";
    hidePopup("settingsPopup");
    
    document.querySelectorAll('.popup-overlay.active').forEach(p => p.classList.remove('active'));
    showWelcomePopup(); 

    console.log("🚪 Người dùng đã đăng xuất.");
}

// Popup Management
function showPopup(popupId) {
  console.log(`📱 Hiển thị popup: ${popupId}`);
  const popup = document.getElementById(popupId);
  if (popup) {
    popup.classList.add("active");
  }
}

function hidePopup(popupId) {
  console.log(`📱 Ẩn popup: ${popupId}`);
  const popup = document.getElementById(popupId);
  if (popup) {
    popup.classList.remove("active");
  }
}

function showWelcomePopup() {
  if (currentUser.name && currentUser.age > 0) {
    document.getElementById("mainApp").style.display = "flex";
    updateUserDisplay();
    updateProgressDisplay(); 
    switchSection('home'); 

    setTimeout(() => {
      addChatMessage("bot", `Chào mừng ${currentUser.name} quay lại! Hôm nay chúng ta học gì nhỉ? 🌟`);
    }, 1000);
  } else {
    showPopup("welcomePopup");
  }
}

function showAvatarSelection() {
  hidePopup("welcomePopup");
  showPopup("avatarPopup");
}

function showNameInput() {
  const selectedAvatarOption = document.querySelector('.avatar-option.selected');
  if (!selectedAvatarOption) {
    showNotification("Hãy chọn avatar trước nhé!", "warning");
    return;
  }
  currentUser.avatar = selectedAvatarOption.dataset.avatar; 
  hidePopup("avatarPopup");
  showPopup("namePopup");
}

function showAgeInput() {
  const name = document.getElementById("studentName").value.trim();
  if (!name) {
    showNotification("Hãy nhập tên của em!", "warning");
    return;
  }
  hidePopup("namePopup");
  showPopup("agePopup");
}

function showMainApp() {
  const ageInput = document.getElementById("studentAge").value;
  if (!ageInput) {
    showNotification("Hãy chọn tuổi của em!", "warning");
    return;
  }

  const nameFromInput = document.getElementById("studentName").value.trim();
  const tempAvatar = currentUser.avatar; 

  currentUser = JSON.parse(JSON.stringify(initialCurrentUserState));

  currentUser.name = nameFromInput;
  currentUser.age = Number.parseInt(ageInput);
  currentUser.avatar = tempAvatar; 

  currentUser.grade = Math.max(1, currentUser.age - 5); 
  currentUser.lastLoginDate = new Date().toDateString();
  currentUser.streak = 1; 

  hidePopup("agePopup");
  document.getElementById("mainApp").style.display = "flex";

  updateUserDisplay(); 
  updateProgressDisplay();
  saveUserData(); 

  setTimeout(() => {
    const greetings = [
      `Chào ${currentUser.name}! Cô Sarah rất vui được gặp em! 🌟`,
      `Hôm nay ${currentUser.name} muốn học gì nhỉ? 📚`,
      `${currentUser.name} đã sẵn sàng cho những thử thách mới chưa? 🚀`,
    ];
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    addChatMessage("bot", randomGreeting);
  }, 1000);

  console.log(`👋 Chào mừng người dùng mới: ${currentUser.name}, ${currentUser.age} tuổi! Avatar: ${currentUser.avatar}`);
  switchSection('home'); 
}


// Avatar Selection
function selectAvatar(e) {
  document.querySelectorAll(".avatar-option").forEach((opt) => opt.classList.remove("selected"));
  const clickedOption = e.target.closest(".avatar-option");
  if (clickedOption) {
    clickedOption.classList.add("selected");
    document.getElementById("confirmAvatar").disabled = false;
    playSound("select");
    console.log(`🎭 Đã chọn avatar (visual): ${clickedOption.dataset.avatar}`);
  }
}

// Grade Selection
function selectGrade(e) {
  document.querySelectorAll(".grade-option").forEach((opt) => opt.classList.remove("selected"));
  const clickedOption = e.target.closest(".grade-option");
  if (clickedOption) {
    clickedOption.classList.add("selected");
    currentUser.grade = Number.parseInt(clickedOption.dataset.grade);
    document.getElementById("startQuiz").disabled = false;
    playSound("select");
    console.log(`📚 Đã chọn lớp: ${currentUser.grade}`);
  }
}

function showGradeSelection() {
  if (currentUser.dailyQuizCount >= 3) {
    showNotification("Em đã làm đủ 3 bộ đề hôm nay rồi! Hãy quay lại vào ngày mai nhé! 😊", "info");
    return;
  }
  showPopup("gradePopup");
}

// Quiz System
async function startQuiz() {
  console.log("🎯 Bắt đầu quiz...");
  hidePopup("gradePopup");
  showPopup("quizPopup");

  currentQuiz = {
    questions: [],
    currentQuestion: 0,
    score: 0,
    answers: [],
  };

  document.getElementById("questionNumber").textContent = "1";
  document.getElementById("progressFill").style.width = "0%";
  document.getElementById("currentScore").textContent = "0";
  document.getElementById("questionText").textContent = "Đang tạo câu hỏi...";
  document.getElementById("answersContainer").innerHTML = '<div class="loading"></div>';

  try {
    await generateQuestions();
    if (currentQuiz.questions.length > 0) {
        displayQuestion();
        console.log(`📝 Đã tạo ${currentQuiz.questions.length} câu hỏi`);
    } else {
        document.getElementById("questionText").textContent = "Không thể tạo câu hỏi lúc này. Vui lòng thử lại sau.";
        setTimeout(() => hidePopup("quizPopup"), 3000);
        console.error("❌ Không có câu hỏi nào được tạo.");
    }
  } catch (error) {
    console.error("❌ Lỗi tạo câu hỏi:", error);
    document.getElementById("questionText").textContent = "Có lỗi xảy ra khi tạo câu hỏi. Hãy thử lại!";
    setTimeout(() => hidePopup("quizPopup"), 2000);
  }
}

async function generateQuestions() {
  const subjects = [
    { name: "Toán học", count: 4 },
    { name: "Tiếng Việt", count: 4 },
    { name: "Tiếng Anh", count: 3 },
    { name: "Kỹ năng sống", count: 2 },
    { name: "Khoa học tự nhiên", count: 2 },
  ];

  const difficulties = ["dễ", "vừa", "khó"];
  const difficultyDistribution = [0.5, 0.3, 0.2];

  console.log("🔄 Đang tạo câu hỏi từ AI...");
  currentQuiz.questions = []; 

  const questionPromises = [];

  for (const subject of subjects) {
    for (let i = 0; i < subject.count; i++) {
      const difficultyIndex = getRandomByDistribution(difficultyDistribution);
      const difficulty = difficulties[difficultyIndex];
      const prompt = createQuestionPrompt(subject.name, currentUser.grade, difficulty);
      questionPromises.push(
          callGeminiAPI(prompt).then(question => {
              if (question) {
                  question.subject = subject.name;
                  question.difficulty = difficulty;
                  return question;
              }
              return null; 
          })
      );
    }
  }

  const resolvedQuestions = await Promise.all(questionPromises);
  currentQuiz.questions = resolvedQuestions.filter(q => q !== null);


  if (currentQuiz.questions.length < 15) {
      console.log(`AI chỉ tạo được ${currentQuiz.questions.length} câu hỏi. Bổ sung câu hỏi dự phòng.`);
      const needed = 15 - currentQuiz.questions.length;
      for (let i = 0; i < needed; i++) {
          currentQuiz.questions.push(generateFallbackQuestion());
      }
  }

  currentQuiz.questions = shuffleArray(currentQuiz.questions).slice(0, 15); 
  console.log(`✅ Đã tạo ${currentQuiz.questions.length} câu hỏi (sau khi shuffle và slice)`);
}

function createQuestionPrompt(subject, grade, difficulty) {
    const age = currentUser.age || (grade + 5); 
  const prompts = {
    "Toán học": `Tạo 1 câu hỏi trắc nghiệm toán học lớp ${grade} (cho trẻ ${age} tuổi) mức độ ${difficulty} có 4 lựa chọn (A, B, C, D). Bao gồm đếm số, phép tính cộng trừ cơ bản, so sánh, hình học đơn giản. Câu hỏi phải rõ ràng.
    Ví dụ: "Có 3 quả táo, thêm 1 quả nữa. Hỏi có tất cả bao nhiêu quả táo?"
    Trả về JSON với format: {"question": "Nội dung câu hỏi (có thể dùng emoji)", "options": ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"], "correct": index_đáp_án_đúng_từ_0_đến_3, "explanation": "Giải thích ngắn gọn đáp án đúng."}`,

    "Tiếng Việt": `Tạo 1 câu hỏi trắc nghiệm tiếng Việt lớp ${grade} (cho trẻ ${age} tuổi) mức độ ${difficulty} có 4 lựa chọn (A, B, C, D). Bao gồm nhận biết chữ cái, ghép vần, từ đơn giản, dấu câu, hoặc tìm từ khác loại. Câu hỏi phải rõ ràng.
    Ví dụ: "Từ nào sau đây chỉ đồ vật: Mèo, Xe ô tô, Mặt trời, Cây xanh?"
    Trả về JSON với format: {"question": "Nội dung câu hỏi (có thể dùng emoji)", "options": ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"], "correct": index_đáp_án_đúng_từ_0_đến_3, "explanation": "Giải thích ngắn gọn đáp án đúng."}`,

    "Tiếng Anh": `Tạo 1 câu hỏi trắc nghiệm tiếng Anh cơ bản lớp ${grade} (cho trẻ ${age} tuổi) mức độ ${difficulty} có 4 lựa chọn (A, B, C, D). Chủ đề: màu sắc, số đếm, động vật, đồ vật quen thuộc, chào hỏi. Câu hỏi phải rõ ràng.
    Ví dụ: "What color is an apple? 🍎" Options: "Blue", "Red", "Green", "Yellow".
    Trả về JSON với format: {"question": "English question (can use emoji)", "options": ["Option A", "Option B", "Option C", "Option D"], "correct": correct_option_index_0_to_3, "explanation": "Brief explanation in Vietnamese."}`,

    "Kỹ năng sống": `Tạo 1 câu hỏi trắc nghiệm về kỹ năng sống cho trẻ ${age} tuổi, mức độ ${difficulty}, có 4 lựa chọn (A, B, C, D). Chủ đề: ứng xử nơi công cộng, an toàn cá nhân, cảm xúc, giúp đỡ người khác. Câu hỏi tình huống đơn giản.
    Ví dụ: "Khi nhận được quà từ người khác, em nên nói gì? 😊" Options: "Không nói gì", "Cảm ơn ạ", "Quà xấu quá", "Đưa đây".
    Trả về JSON với format: {"question": "Nội dung câu hỏi (có thể dùng emoji)", "options": ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"], "correct": index_đáp_án_đúng_từ_0_đến_3, "explanation": "Giải thích ngắn gọn đáp án đúng."}`,

    "Khoa học tự nhiên": `Tạo 1 câu hỏi trắc nghiệm khoa học tự nhiên lớp ${grade} (cho trẻ ${age} tuổi) mức độ ${difficulty} có 4 lựa chọn (A, B, C, D). Chủ đề: động vật, thực vật, thời tiết, các mùa, bộ phận cơ thể. Câu hỏi phải rõ ràng.
    Ví dụ: "Con vật nào sống dưới nước? 🌊" Options: "Chó", "Chim", "Cá", "Mèo".
    Trả về JSON với format: {"question": "Nội dung câu hỏi (có thể dùng emoji)", "options": ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"], "correct": index_đáp_án_đúng_từ_0_đến_3, "explanation": "Giải thích ngắn gọn đáp án đúng."}`,
  };
  return prompts[subject];
}

async function callGeminiAPI(prompt) {
  try {
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.9, 
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [ 
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        ]
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`API Error: ${response.status}`, errorBody);
      try {
        const errorJson = JSON.parse(errorBody);
        if (errorJson.error && errorJson.error.message) {
          console.error("Gemini API specific error message:", errorJson.error.message);
        }
      } catch (e) { /* Not a JSON error body */ }
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    if (data.candidates && data.candidates[0].content && data.candidates[0].content.parts[0]) {
      const text = data.candidates[0].content.parts[0].text;
      const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```|({[\s\S]*})/); 
      if (jsonMatch) {
        const jsonString = jsonMatch[1] || jsonMatch[2];
        try {
            const question = JSON.parse(jsonString);
            if (
              question.question &&
              question.options &&
              Array.isArray(question.options) && 
              question.options.length === 4 &&
              typeof question.correct === "number" &&
              question.correct >= 0 && question.correct < 4 &&
              question.explanation
            ) {
              performanceMetrics.questionsGenerated++;
              return question;
            } else {
                console.warn("Invalid question structure from API:", question, "Original string:", jsonString);
            }
        } catch (e) {
            console.error("Error parsing JSON from API response:", e, "Original string:", jsonString, "Full text:", text);
        }
      } else {
        console.warn("No JSON block found in API response:", text);
      }
    } else if (data.promptFeedback && data.promptFeedback.blockReason) {
        console.error("Gemini prompt blocked:", data.promptFeedback.blockReason, data.promptFeedback.safetyRatings);
    } else if (data.candidates && data.candidates[0] && data.candidates[0].finishReason === "SAFETY") {
        console.error("Gemini generation stopped due to safety settings. Ratings:", data.candidates[0].safetyRatings);
    }


    console.log("Falling back to default question due to API issue.");
    return generateFallbackQuestion();
  } catch (error) {
    console.error("🚨 Gemini API Call Error for question generation:", error);
    performanceMetrics.errorsEncountered++;
    return generateFallbackQuestion();
  }
}

function generateFallbackQuestion() {
  const fallbackQuestions = [
    { question: "🍎🍎 + 🍎 = ?", options: ["2", "3", "4", "5"], correct: 1, explanation: "2 quả táo cộng 1 quả táo bằng 3 quả táo.", subject: "Toán học", difficulty: "dễ"},
    { question: "Con gì kêu 'gâu gâu'? 🐶", options: ["Mèo 🐱", "Chó 🐶", "Vịt 🦆", "Gà 🐔"], correct: 1, explanation: "Chó kêu 'gâu gâu'.", subject: "Khoa học tự nhiên", difficulty: "dễ"},
    { question: "Mặt trời màu gì? ☀️", options: ["Xanh dương 🔵", "Xanh lá 🟢", "Vàng 🟡", "Tím 🟣"], correct: 2, explanation: "Mặt trời thường có màu vàng.", subject: "Khoa học tự nhiên", difficulty: "dễ"},
    { question: "Số nào đứng sau số 2?", options: ["1", "3", "4", "5"], correct: 1, explanation: "Số 3 đứng sau số 2.", subject: "Toán học", difficulty: "dễ"},
    { question: "Khi gặp người lớn, em nên làm gì?", options: ["Chạy đi", "Chào hỏi lễ phép 👋", "Làm ngơ", "Khóc"], correct: 1, explanation: "Khi gặp người lớn, em nên chào hỏi lễ phép.", subject: "Kỹ năng sống", difficulty: "dễ" },
  ];
  const randomQuestion = fallbackQuestions[Math.floor(Math.random() * fallbackQuestions.length)];
  return randomQuestion;
}

function displayQuestion() {
  if (currentQuiz.currentQuestion >= currentQuiz.questions.length || currentQuiz.currentQuestion >= 15) {
    showResults();
    return;
  }

  const question = currentQuiz.questions[currentQuiz.currentQuestion];
  if (!question || !question.options || !question.options.length) {
      console.error("Câu hỏi không hợp lệ hoặc thiếu lựa chọn:", question);
      currentQuiz.currentQuestion++;
      displayQuestion(); 
      return;
  }

  const progress = ((currentQuiz.currentQuestion + 1) / 15) * 100;

  document.getElementById("questionNumber").textContent = currentQuiz.currentQuestion + 1;
  document.getElementById("progressFill").style.width = progress + "%";
  document.getElementById("questionText").textContent = question.question;

  const answersContainer = document.getElementById("answersContainer");
  answersContainer.innerHTML = "";

  question.options.forEach((option, index) => {
    const answerDiv = document.createElement("div");
    answerDiv.className = "answer-option";
    answerDiv.textContent = option;
    answerDiv.addEventListener("click", () => selectAnswer(index));
    answersContainer.appendChild(answerDiv);
  });

  document.getElementById("nextQuestion").style.display = "none";
  console.log(`❓ Câu ${currentQuiz.currentQuestion + 1}: ${question.subject || 'N/A'} - ${question.difficulty || 'N/A'} - ${question.question}`);
}

function selectAnswer(selectedIndex) {
  const question = currentQuiz.questions[currentQuiz.currentQuestion];
  const answerOptions = document.querySelectorAll(".answer-option");

  answerOptions.forEach((option) => {
    option.style.pointerEvents = "none"; 
  });

  answerOptions[selectedIndex].classList.add("selected");

  setTimeout(() => {
    if (typeof question.correct !== 'number' || question.correct < 0 || question.correct >= question.options.length) {
        console.error("Chỉ số đáp án đúng không hợp lệ:", question.correct, "cho câu hỏi:", question.question);
        answerOptions[selectedIndex].classList.add("incorrect");
        playSound("incorrect");
        showNotification("Lỗi với câu hỏi này, đáp án của bạn được tính là sai.", "error");
    } else {
        answerOptions[question.correct].classList.add("correct");
        if (selectedIndex !== question.correct) {
            answerOptions[selectedIndex].classList.add("incorrect");
            playSound("incorrect");
            setTimeout(() => { 
                showNotification(`Tiếc quá! ${question.explanation || 'Cố gắng lần sau nhé.'}`, "warning");
            }, 500);
        } else {
            currentQuiz.score++;
            currentUser.points += 5;
            playSound("correct");
            showSuccessAnimation();
            setTimeout(() => {
                showNotification(`Đúng rồi! ${question.explanation || 'Tuyệt vời!'}`, "success");
            }, 500);
        }
    }


    currentQuiz.answers.push({
      question: question.question,
      selected: selectedIndex,
      correct: question.correct,
      isCorrect: selectedIndex === question.correct,
      explanation: question.explanation,
      subject: question.subject,
      difficulty: question.difficulty,
    });

    document.getElementById("currentScore").textContent = currentQuiz.score;
    document.getElementById("nextQuestion").style.display = "block";
    updateUserDisplay(); 
  }, 1000);
}

function nextQuestion() {
  currentQuiz.currentQuestion++;
  displayQuestion();
}

function showResults() {
  console.log("📊 Hiển thị kết quả quiz");
  hidePopup("quizPopup");

  const finalScore = currentQuiz.score;
  let pointsEarnedThisQuiz = finalScore * 5; 
  let bonusPoints = 0;

  if (finalScore === 15) { 
    bonusPoints = pointsEarnedThisQuiz; 
    document.getElementById("perfectScore").style.display = "block";
    if (!currentUser.perfectScores) currentUser.perfectScores = 0;
    currentUser.perfectScores++;
  } else {
    document.getElementById("perfectScore").style.display = "none";
  }

  currentUser.points += bonusPoints;

  currentUser.dailyQuizCount++;
  currentUser.totalQuizzes++;
  currentUser.correctAnswers += finalScore;

  const studyTask = document.getElementById("task4");
  if (studyTask && !studyTask.checked) {
    studyTask.checked = true;
    updateTaskProgress(); 
  }

  updateStreakCounter();

  document.getElementById("finalScore").textContent = finalScore;
  document.getElementById("pointsEarned").textContent = pointsEarnedThisQuiz + bonusPoints;

  updateUserDisplay();
  checkAchievements();
  saveUserData();
  showPopup("resultsPopup");

  if (finalScore === 15) {
    playSound("perfect"); showFireworks();
    setTimeout(() => showNotification("🎉 Xuất sắc! Em làm đúng tất cả! 🎉", "success"), 1000);
  } else if (finalScore >= 12) {
    playSound("complete"); showNotification("👏 Làm tốt lắm! Em rất giỏi! 👏", "success");
  } else if (finalScore >= 8) {
    playSound("complete"); showNotification("😊 Khá tốt! Lần sau em sẽ làm tốt hơn! 😊", "info");
  } else {
    playSound("complete"); showNotification("💪 Cố gắng lên! Em sẽ tiến bộ hơn! 💪", "warning");
  }
  console.log(`📈 Kết quả: ${finalScore}/15 - Tổng điểm earned từ quiz này: ${pointsEarnedThisQuiz + bonusPoints}`);
}

// Mini Game
function startMiniGame() {
  console.log("🎮 Bắt đầu mini game");
  showPopup("miniGamePopup");

  const randomFlag = flagData[Math.floor(Math.random() * flagData.length)];
  document.getElementById("flagEmoji").textContent = randomFlag.flag;
  document.getElementById("flagQuestion").textContent = "Đây là lá cờ của nước nào?";

  const answersContainer = document.getElementById("flagAnswers");
  answersContainer.innerHTML = "";
  const shuffledOptions = shuffleArray([...randomFlag.options]);

  shuffledOptions.forEach((option) => {
    const answerDiv = document.createElement("div");
    answerDiv.className = "answer-option";
    answerDiv.textContent = option;
    answerDiv.addEventListener("click", () => {
      answersContainer.querySelectorAll(".answer-option").forEach((opt) => {
        opt.style.pointerEvents = "none";
      });

      if (option === randomFlag.country) {
        answerDiv.classList.add("correct");
        currentUser.points += 10;
        updateUserDisplay(); saveUserData(); playSound("correct");
        setTimeout(() => {
          showNotification("🎉 Chính xác! Em nhận được 10 điểm thưởng! 🎉", "success");
          hidePopup("miniGamePopup");
        }, 1500);
      } else {
        answerDiv.classList.add("incorrect");
        setTimeout(() => {
          answersContainer.querySelectorAll(".answer-option").forEach((opt) => {
            if (opt.textContent === randomFlag.country) opt.classList.add("correct");
          });
        }, 500);
        playSound("incorrect");
        setTimeout(() => showNotification(`Đáp án đúng là: ${randomFlag.country}`, "info"), 1000);
        setTimeout(() => hidePopup("miniGamePopup"), 2500); 
      }
    });
    answersContainer.appendChild(answerDiv);
  });
}

// Task Management
function updateTaskProgress() {
  const checkboxes = document.querySelectorAll('.task-item input[type="checkbox"]');
  let completedCount = 0;
  const previouslyCompletedTasks = [...currentUser.completedTasks]; 

  currentUser.completedTasks = []; 

  checkboxes.forEach((checkbox, index) => {
    const taskItem = checkbox.closest(".task-item");
    if (checkbox.checked) {
      completedCount++;
      taskItem.classList.add("completed");
      currentUser.completedTasks.push(index); 

      if (!previouslyCompletedTasks.includes(index)) { 
        currentUser.points += 10;
        showTaskCompleteAnimation(taskItem);
        playSound("correct");
        const taskName = taskItem.querySelector(".task-info h4").textContent;
        setTimeout(() => showNotification(`✅ Hoàn thành: ${taskName} (+10 điểm)`, "success"), 500);
      }
    } else {
      taskItem.classList.remove("completed");
    }
  });

  updatePetEmotion(completedCount);
  updateUserDisplay();
  
  const progressIndicator = document.getElementById("completedTasks");
  if (progressIndicator) progressIndicator.textContent = completedCount;

  if (completedCount === 5 && previouslyCompletedTasks.length < 5) {
    currentUser.points += 50; 
    updateUserDisplay();
    showFireworks();
    setTimeout(() => showNotification("🎊 Tuyệt vời! Em đã hoàn thành tất cả nhiệm vụ! Thưởng 50 điểm! 🎊", "success"), 1000);
  }
  saveUserData(); 
  console.log(`✅ Hoàn thành ${completedCount}/5 nhiệm vụ`);
}

// Navigation
function switchSection(sectionName) {
  console.log(`🧭 Chuyển đến section: ${sectionName}`);

  document.querySelectorAll(".nav-btn").forEach((btn) => btn.classList.remove("active"));
  const navButton = document.querySelector(`.nav-btn[data-section="${sectionName}"]`);
  if (navButton) navButton.classList.add("active");

  document.querySelectorAll(".content-section").forEach((section) => section.classList.remove("active"));
  const targetSection = document.getElementById(`${sectionName}Section`);
  if (targetSection) targetSection.classList.add("active");
  else {
    console.error(`Section ${sectionName}Section không tìm thấy!`); return;
  }

  const titles = { home: "Dashboard", study: "Học tập", shop: "Cửa hàng", achievements: "Thành tích", collection: "Bộ sưu tập" };
  const pageTitleElement = document.querySelector(".page-title");
  if (pageTitleElement) pageTitleElement.textContent = titles[sectionName] || "Dashboard";

  try {
    if (sectionName === "shop") {
        const activeCategoryBtn = document.querySelector(".category-btn.active");
        const categoryToLoad = activeCategoryBtn ? activeCategoryBtn.dataset.category : "pets";
        switchShopCategory(categoryToLoad); 
    } else if (sectionName === "achievements") {
      updateAchievements();
    } else if (sectionName === "home") {
      updateProgressDisplay(); 
    } else if (sectionName === "collection") {
      updatePetCollectionDisplay();
    }
  } catch (e) {
    console.error(`Lỗi khi tải dữ liệu cho section ${sectionName}:`, e);
    showNotification(`Lỗi khi tải dữ liệu cho mục ${titles[sectionName]}.`, "error");
  }
  playSound("select");
}

// Shop System
function switchShopCategory(category) {
  console.log(`🛒 Chuyển danh mục shop: ${category}`);

  document.querySelectorAll(".category-btn").forEach((btn) => btn.classList.remove("active"));
  const categoryButton = document.querySelector(`.category-btn[data-category="${category}"]`);
  if (categoryButton) categoryButton.classList.add("active");

  loadShopItems(category);
  playSound("select");
}

function loadShopItems(category) {
  const shopGrid = document.getElementById("shopGrid");
  const items = shopItems[category];
  if (!shopGrid || !items) {
    console.error(`Shop grid hoặc items cho category ${category} không tồn tại.`);
    return;
  }
  shopGrid.innerHTML = "";

  items.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "shop-item";
    const canAfford = currentUser.points >= item.price;
    let owned = false;
    let hasAnyPet = currentUser.pets && currentUser.pets.length > 0;

    if (category === "pets") {
        owned = currentUser.pets.some((pet) => pet.id === item.id);
    }


    if (item.level === 3) itemDiv.classList.add("level-3-pet");
    else if (item.level === 2) itemDiv.classList.add("level-2-pet");
    else if (item.level === 1) itemDiv.classList.add("level-1-pet");

    let iconElement = item.isImage ? `<img src="${item.icon}" alt="${item.name}" class="shop-item-image">` : `<div class="shop-item-icon">${item.icon}</div>`;
    
    let buttonText = "Mua ngay 🛒";
    let buttonDisabled = !canAfford;

    if (category === 'pets' && owned) {
        buttonText = "Đã mua ✅";
        buttonDisabled = true;
    } else if (!canAfford) {
        buttonText = "Không đủ điểm 💸";
        buttonDisabled = true;
    } else if (category === 'accessories' && !hasAnyPet) {
        buttonText = "Cần có thú cưng";
        buttonDisabled = true;
    }


    itemDiv.innerHTML = `
      ${iconElement}
      <div class="shop-item-name">${item.name}</div>
      <div class="shop-item-price">${item.price} điểm 💎</div>
      ${item.pieces ? `<div class="shop-item-pieces">Cần ${item.pieces} mảnh ghép</div>` : ""}
      ${item.description ? `<div class="shop-item-description">${item.description}</div>` : ""}
      <button class="buy-btn" ${buttonDisabled ? "disabled" : ""} onclick="buyItem('${item.id}', '${category}')">
        ${buttonText}
      </button>
    `;
    shopGrid.appendChild(itemDiv);
  });
  const shopPointsEl = document.getElementById("shopPoints");
  if (shopPointsEl) shopPointsEl.textContent = currentUser.points;
  console.log(`🛍️ Đã tải ${items.length} items cho danh mục ${category}`);
}

function buyItem(itemId, category) {
  const item = shopItems[category].find((i) => i.id === itemId);
  if (!item) return;

  if (currentUser.points >= item.price) {
    
    if (category === "pets") {
        if (currentUser.pets.some(p => p.id === item.id)) {
            showNotification(`Em đã sở hữu ${item.name} rồi!`, "info");
            return;
        }
      currentUser.points -= item.price; 
      const newPet = {
        id: item.id, name: item.name, icon: item.icon,
        level: item.level || 1, happiness: 100, hunger: 0,
        purchaseDate: new Date().toISOString(), isImage: item.isImage || false,
        accessories: [] 
      };
      currentUser.pets.push(newPet);
      updatePetDisplay(); checkAchievements();
      if (item.level === 3) {
        showFireworks();
        setTimeout(() => showNotification(`🎊 Chúc mừng! Em đã mua được ${item.name} - thú cưng huyền thoại! 🎊`, "success"), 1000);
      }
      showNotification(`✅ Đã mua ${item.name} thành công! 🎉`, "success");
    } else if (category === "accessories") {
        if (!currentUser.pets || currentUser.pets.length === 0) {
            showNotification("Em cần có thú cưng trước khi mua phụ kiện nhé!", "warning");
            return;
        }
        selectedAccessoryToAssign = item;
        showPetAccessoryAssignmentPopup(item);
        return; 
    } else if (category === "food") {
        currentUser.points -= item.price;
        showNotification(`✅ Đã mua ${item.name}! Em có thể dùng nó để cho thú cưng ăn.`, "success");
    }

    updateUserDisplay(); loadShopItems(category); saveUserData();
    playSound("purchase");
    console.log(`💰 Đã mua ${item.name} với giá ${item.price} điểm`);
  } else {
    showNotification(`💸 Không đủ điểm! Cần thêm ${item.price - currentUser.points} điểm nữa.`, "warning");
  }
}

function showPetAccessoryAssignmentPopup(accessoryItem) {
    const petListDiv = document.getElementById("assignPetList");
    petListDiv.innerHTML = ""; 

    if (!currentUser.pets || currentUser.pets.length === 0) {
        showNotification("Em không có thú cưng nào để gắn phụ kiện.", "info");
        hidePopup("assignAccessoryPopup");
        return;
    }
    
    document.querySelector("#assignAccessoryPopup h2").textContent = `Gắn "${accessoryItem.name}" (${accessoryItem.icon}) cho thú cưng nào?`;

    currentUser.pets.forEach((pet, index) => {
        const petOptionDiv = document.createElement("div");
        petOptionDiv.className = "avatar-option"; 
        petOptionDiv.style.flexDirection = "column"; 
        petOptionDiv.style.height = "auto"; 
        petOptionDiv.style.padding = "10px";
        petOptionDiv.dataset.petIndex = index;

        let petIconHtml = pet.isImage ? 
            `<img src="${pet.icon}" alt="${pet.name}" class="avatar-image" style="width: 50px; height: 50px; margin-bottom: 5px; object-fit: contain;">` : 
            `<div style="font-size: 2rem; margin-bottom: 5px;">${pet.icon}</div>`;
        
        petOptionDiv.innerHTML = `
            ${petIconHtml}
            <span style="font-size: 0.8rem;">${pet.name}</span>
        `;
        petOptionDiv.addEventListener("click", (e) => {
            document.querySelectorAll("#assignPetList .avatar-option").forEach(opt => opt.classList.remove("selected"));
            e.currentTarget.classList.add("selected");
        });
        petListDiv.appendChild(petOptionDiv);
    });
    showPopup("assignAccessoryPopup");
}

function confirmAssignAccessoryToPet() {
    const selectedPetDiv = document.querySelector("#assignPetList .avatar-option.selected");
    if (!selectedPetDiv) {
        showNotification("Hãy chọn một thú cưng để gắn phụ kiện.", "warning");
        return;
    }
    if (!selectedAccessoryToAssign) {
        console.error("Không có phụ kiện nào được chọn để gán.");
        hidePopup("assignAccessoryPopup");
        return;
    }

    const petIndex = parseInt(selectedPetDiv.dataset.petIndex);
    const petToEquip = currentUser.pets[petIndex];

    if (petToEquip) {
        currentUser.points -= selectedAccessoryToAssign.price;

        if (!petToEquip.accessories) {
            petToEquip.accessories = [];
        }
        petToEquip.accessories.push(selectedAccessoryToAssign.id);
        
        showNotification(`✅ Đã gắn ${selectedAccessoryToAssign.name} ${selectedAccessoryToAssign.icon} cho ${petToEquip.name}!`, "success");
        
        updateUserDisplay();
        updatePetDisplay(); 
        updatePetCollectionDisplay(); 
        loadShopItems("accessories"); 
        saveUserData();
        playSound("purchase");

    } else {
        showNotification("Không tìm thấy thú cưng được chọn.", "error");
        // Points should still be deducted as the item was "intended" for purchase.
        // This path indicates an internal error more than user error.
        currentUser.points -= selectedAccessoryToAssign.price; 
        updateUserDisplay();
        loadShopItems("accessories");
        saveUserData();
    }
    
    hidePopup("assignAccessoryPopup");
    selectedAccessoryToAssign = null; 
}


function updatePetDisplay() {
  const petDisplayContainer = document.getElementById("petDisplay"); 
  if (!petDisplayContainer) return;

  if (currentUser.pets.length === 0) {
    petDisplayContainer.innerHTML = `<div class="pet-placeholder"><i class="fas fa-paw"></i><p>Chưa có thú cưng nào<br>Hãy mua từ cửa hàng nhé!</p></div>`;
  } else {
    const activePet = currentUser.pets[currentUser.pets.length - 1]; 
    const petDataFromShop = shopItems.pets.find((p) => p.id === activePet.id); 
    let petIconHtml = "";
    let petClass = "";

    if (activePet.isImage) {
      petIconHtml = `<img src="${activePet.icon}" alt="${activePet.name}" class="pet-avatar-image">`;
    } else {
      petIconHtml = `<div class="pet-avatar">${activePet.icon}</div>`;
    }

    if (petDataFromShop) {
        if (petDataFromShop.level === 3) petClass = "level-3-pet brainrot-character";
        else if (petDataFromShop.level === 2) petClass = "level-2-pet sea-creature";
        else petClass = "level-1-pet";
    }
    
    let accessoriesHtml = "";
    if (activePet.accessories && activePet.accessories.length > 0) {
        activePet.accessories.forEach(accId => {
            const accData = shopItems.accessories.find(a => a.id === accId);
            if (accData) {
                accessoriesHtml += `<span class="pet-accessory-icon-small">${accData.icon}</span>`;
            }
        });
    }

    petDisplayContainer.innerHTML = `
      <div class="active-pet ${petClass}">
        <div style="position: relative; display: inline-block; margin-bottom: var(--spacing-md);">
            ${petIconHtml}
            <div class="pet-accessories-on-display"> 
                ${accessoriesHtml}
            </div>
        </div>
        <h3>${activePet.name}</h3>
        <div class="pet-stats">
          <div class="stat">Vui vẻ: ${activePet.happiness}%</div><div class="stat">Đói: ${activePet.hunger}%</div>
        </div>
        <div class="pet-actions">
          <button onclick="feedPet()" class="pet-action-btn">🍖 Cho ăn</button>
          <button onclick="playWithPet()" class="pet-action-btn">🎾 Chơi cùng</button>
          <button onclick="cleanPet()" class="pet-action-btn">🛁 Tắm rửa</button>
        </div>
      </div>`;
  }
}


function updatePetCollectionDisplay() {
    const collectionGrid = document.getElementById("petCollectionGrid");
    if (!collectionGrid) return;
    const emptyMessage = collectionGrid.querySelector(".empty-collection-message");

    if (!currentUser.pets || currentUser.pets.length === 0) {
        collectionGrid.innerHTML = ""; 
        if (emptyMessage) emptyMessage.style.display = "block";
        else collectionGrid.innerHTML = '<p class="empty-collection-message" style="text-align: center; color: var(--text-muted); grid-column: 1 / -1;">Em chưa có thú cưng nào trong bộ sưu tập. Hãy vào cửa hàng để mua nhé!</p>';
        return;
    }

    if (emptyMessage) emptyMessage.style.display = "none";
    collectionGrid.innerHTML = ""; 

    currentUser.pets.forEach(pet => {
        const petCard = document.createElement("div");
        petCard.className = "collection-pet-card";
        const petDataFromShop = shopItems.pets.find(p => p.id === pet.id);
        let petClass = "";
        if (petDataFromShop) {
            if (petDataFromShop.level === 3) petClass = "level-3-pet brainrot-character";
            else if (petDataFromShop.level === 2) petClass = "level-2-pet sea-creature";
            else petClass = "level-1-pet";
        }
        petCard.classList.add(petClass);

        const petImageHtml = pet.isImage ? 
            `<img src="${pet.icon}" alt="${pet.name}" class="collection-pet-image">` : 
            `<div class="collection-pet-emoji">${pet.icon}</div>`;

        let accessoriesHtml = "";
        if (pet.accessories && pet.accessories.length > 0) {
            pet.accessories.forEach(accId => {
                const accData = shopItems.accessories.find(a => a.id === accId);
                if (accData) {
                    accessoriesHtml += `<span class="pet-accessory-icon">${accData.icon}</span>`;
                }
            });
        }

        petCard.innerHTML = `
            <div style="position: relative;"> 
                ${petImageHtml}
                <div class="pet-accessories-display">
                    ${accessoriesHtml}
                </div>
            </div>
            <div class="collection-pet-name">${pet.name}</div>
            <div class="collection-pet-stats">
                <span>Vui: ${pet.happiness}%</span>
                <span>Đói: ${pet.hunger}%</span>
            </div>
            <div class="collection-pet-actions">
                <button class="btn-small btn-primary" onclick="setActivePet('${pet.id}')">Chọn làm thú cưng chính</button>
            </div>
        `;
        collectionGrid.appendChild(petCard);
    });
}

function setActivePet(petId) {
    const petIndex = currentUser.pets.findIndex(p => p.id === petId);
    if (petIndex > -1) {
        const petToActivate = currentUser.pets.splice(petIndex, 1)[0];
        currentUser.pets.push(petToActivate);
        updatePetDisplay(); 
        updatePetCollectionDisplay(); 
        saveUserData();
        showNotification(`${petToActivate.name} đã được chọn làm thú cưng chính!`, "success");
        switchSection('home'); 
    }
}


function feedPet() {
  if (currentUser.pets.length > 0 && currentUser.points >= 20) {
    currentUser.points -= 20;
    const pet = currentUser.pets[currentUser.pets.length - 1];
    pet.hunger = Math.max(0, pet.hunger - 30);
    pet.happiness = Math.min(100, pet.happiness + 10);
    updatePetDisplay(); updateUserDisplay(); saveUserData(); playSound("correct");
    addChatMessage("bot", `${pet.name} rất vui vì được cho ăn! 😋`);
    showNotification(`🍖 Đã cho ${pet.name} ăn! (+10 vui vẻ, -30 đói)`, "success");
  } else if (currentUser.points < 20) {
    showNotification("💸 Không đủ điểm để mua thức ăn! Cần 20 điểm.", "warning");
  } else if (currentUser.pets.length === 0) {
    showNotification("Em chưa có thú cưng nào để cho ăn!", "info");
  }
}

function playWithPet() {
  if (currentUser.pets.length > 0) {
    const pet = currentUser.pets[currentUser.pets.length - 1];
    pet.happiness = Math.min(100, pet.happiness + 20);
    pet.hunger = Math.min(100, pet.hunger + 10); 
    updatePetDisplay(); saveUserData(); playSound("correct");
    const playMessages = [`${pet.name} rất thích chơi với em! 🎉`, `${pet.name} nhảy nhót vui vẻ! 🕺`, `${pet.name} cảm thấy hạnh phúc! 😄`];
    addChatMessage("bot", playMessages[Math.floor(Math.random() * playMessages.length)]);
    showNotification(`🎾 Đã chơi với ${pet.name}! (+20 vui vẻ, +10 đói)`, "success");
  } else {
    showNotification("Em chưa có thú cưng nào để chơi cùng!", "info");
  }
}

function cleanPet() {
  if (currentUser.pets.length > 0 && currentUser.points >= 15) {
    currentUser.points -= 15;
    const pet = currentUser.pets[currentUser.pets.length - 1];
    pet.happiness = Math.min(100, pet.happiness + 15);
    updatePetDisplay(); updateUserDisplay(); saveUserData(); playSound("correct");
    addChatMessage("bot", `${pet.name} thật sạch sẽ và thơm tho! ✨`);
    showNotification(`🛁 Đã tắm cho ${pet.name}! (+15 vui vẻ)`, "success");
  } else if (currentUser.points < 15) {
    showNotification("💸 Không đủ điểm để tắm cho thú cưng! Cần 15 điểm.", "warning");
  } else if (currentUser.pets.length === 0) {
    showNotification("Em chưa có thú cưng nào để tắm!", "info");
  }
}

// Achievements
function checkAchievements() {
  const newAchievements = [];
  const petLevels = currentUser.pets.map((pet) => {
    const petData = shopItems.pets.find((p) => p.id === pet.id);
    return petData ? petData.level : 1;
  });

  if (petLevels.includes(1) && !currentUser.achievements.includes("helper")) {
    currentUser.achievements.push("helper"); newAchievements.push("helper");
  }
  if (petLevels.includes(2) && !currentUser.achievements.includes("golden")) {
    currentUser.achievements.push("golden"); newAchievements.push("golden");
  }
  if (petLevels.includes(3) && !currentUser.achievements.includes("diamond")) {
    currentUser.achievements.push("diamond"); newAchievements.push("diamond");
  }
  if (currentUser.totalQuizzes >= 10 && !currentUser.achievements.includes("scholar")) {
    currentUser.achievements.push("scholar"); newAchievements.push("scholar");
  }
  if (currentUser.perfectScores >= 3 && !currentUser.achievements.includes("perfectionist")) {
    currentUser.achievements.push("perfectionist"); newAchievements.push("perfectionist");
  }

  newAchievements.forEach((id) => setTimeout(() => showAchievementUnlocked(id), 1000));
  if (newAchievements.length > 0) console.log(`🏆 Mở khóa ${newAchievements.length} thành tích mới!`);
}

function updateAchievements() {
  const achievementGrid = document.getElementById("achievementsGrid");
  if (!achievementGrid) return; 

  achievementGrid.innerHTML = ''; 

  Object.keys(achievementDefinitions).forEach(achievementId => {
    const def = achievementDefinitions[achievementId];
    const card = document.createElement('div');
    card.classList.add('achievement-card');
    card.dataset.achievement = achievementId;

    let progressText = "Chưa đạt";
    let isUnlocked = currentUser.achievements.includes(achievementId);

    if (achievementId === 'scholar') {
        progressText = `${Math.min(currentUser.totalQuizzes || 0, 10)}/10 bộ đề`;
    } else if (achievementId === 'perfectionist') {
        progressText = `${Math.min(currentUser.perfectScores || 0, 3)}/3 lần tuyệt đối`;
    } else if (def.requirement && def.requirement.startsWith('pet_level_')) {
        progressText = isUnlocked ? "Đã đạt" : "Chưa sở hữu";
    } else { 
        progressText = isUnlocked ? "Đã đạt" : "Chưa đạt";
    }


    if (isUnlocked) {
      card.classList.add('unlocked');
    } else {
      card.classList.add('locked');
    }

    card.innerHTML = `
      <div class="achievement-icon">${def.icon}</div>
      <h4>${def.name}</h4>
      <p>${def.description}</p>
      <div class="achievement-progress">${progressText}</div>
    `;
    achievementGrid.appendChild(card);
  });
}


function showAchievementUnlocked(achievementId) {
  const achievement = achievementDefinitions[achievementId];
  if (!achievement) return;
  showFireworks(); playSound("perfect");
  setTimeout(() => showNotification(`🎉 Chúc mừng! Em đã mở khóa danh hiệu "${achievement.name}"! 🏆`, "success"), 1000);
  console.log(`🏆 Mở khóa thành tích: ${achievement.name}`);
  updateAchievements(); 
}

// Chat System
function toggleChat() {
  const chatWidget = document.getElementById("chatWidget");
  chatWidget.classList.toggle("active");
  if (chatWidget.classList.contains("active")) document.getElementById("chatInput").focus();
}

async function sendChatMessage() {
  const input = document.getElementById("chatInput");
  const message = input.value.trim();
  if (!message) return;

  addChatMessage("user", message);
  input.value = "";
  input.disabled = true;
  document.getElementById("sendChatBtn").disabled = true;

  try {
    const botResponse = await getGeminiChatResponse(message);
    addChatMessage("bot", botResponse);
  } catch (error) {
    console.error("Lỗi khi lấy phản hồi từ Gemini:", error);
    addChatMessage("bot", "Cô xin lỗi, cô đang gặp chút sự cố. Em thử lại sau nhé.");
  } finally {
    input.disabled = false;
    document.getElementById("sendChatBtn").disabled = false;
    input.focus();
  }
}

async function getGeminiChatResponse(userMessage) {
  const petInfo = currentUser.pets.length > 0 
    ? `Em có ${currentUser.pets.length} thú cưng. Tên thú cưng hiện tại là ${currentUser.pets[currentUser.pets.length-1].name}.` 
    : "Em chưa có thú cưng nào.";

  const prompt = `Bạn là Cô Sarah, một giáo viên AI thân thiện, vui vẻ và kiên nhẫn, đang nói chuyện với một học sinh tiểu học tên là ${currentUser.name || 'em'}.
Hãy trả lời tin nhắn của học sinh một cách tự nhiên, phù hợp với lứa tuổi, và khuyến khích.
Thông tin về học sinh (nếu có liên quan đến câu hỏi):
- Điểm hiện tại: ${currentUser.points}
- ${petInfo}
- Số bộ đề đã làm trong ngày: ${currentUser.dailyQuizCount}/3
- Tổng số bộ đề đã làm: ${currentUser.totalQuizzes}
- Tổng số câu trả lời đúng: ${currentUser.correctAnswers}
- Chuỗi ngày học liên tiếp (streak): ${currentUser.streak}

Tin nhắn của học sinh: "${userMessage}"

Câu trả lời của Cô Sarah (ngắn gọn, thân thiện, bằng tiếng Việt, tối đa 2-3 câu, không dùng markdown, không lặp lại câu hỏi của học sinh):`;


  try {
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7, topK: 40, topP: 0.95, maxOutputTokens: 150,
        },
         safetySettings: [ 
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        ]
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Lỗi API: ${response.status} - ${errorBody}`);
    }
    const data = await response.json();

    if (data.candidates && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
      let textResponse = data.candidates[0].content.parts[0].text;
      textResponse = textResponse.replace(/^Câu trả lời của Cô Sarah:\s*/i, "").trim(); 
      return textResponse || "Cô Sarah đang suy nghĩ... Em đợi chút nhé!";
    } else if (data.promptFeedback && data.promptFeedback.blockReason) {
      console.error("Prompt Gemini bị chặn:", data.promptFeedback.blockReason, data.promptFeedback.safetyRatings);
      return "Cô xin lỗi, cô không thể trả lời câu hỏi đó lúc này.";
    } else if (data.candidates && data.candidates[0] && data.candidates[0].finishReason === "SAFETY") {
        console.error("Gemini generation stopped due to safety settings. Ratings:", data.candidates[0].safetyRatings);
        return "Cô thấy câu hỏi này hơi nhạy cảm một chút, mình nói chuyện khác được không em?";
    }
     else {
      console.error("Không có nội dung hợp lệ trong phản hồi Gemini:", data);
      return "Cô Sarah chưa nghĩ ra câu trả lời. Em hỏi lại sau nhé!";
    }
  } catch (error) {
    console.error("🚨 Lỗi gọi API Gemini cho chat:", error);
    performanceMetrics.errorsEncountered++;
    return generateChatResponse(userMessage); 
  }
}

function addChatMessage(sender, message) {
  const messagesContainer = document.getElementById("chatMessages");
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}-message`;
  let avatar = "";
  if (sender === "bot") {
    avatar = '<img src="images/teacher-sarah-new.png" alt="Cô Sarah" class="message-avatar">';
  } else {
    if (currentUser.avatar && typeof currentUser.avatar === 'string' && currentUser.avatar.includes("images/")) { 
      avatar = `<img src="${currentUser.avatar}" alt="Avatar" class="message-avatar user-avatar-image">`; 
    } else if (currentUser.avatar && typeof currentUser.avatar === 'string') { 
      avatar = `<span class="message-avatar">${currentUser.avatar}</span>`;
    } else { 
      avatar = `<span class="message-avatar">${initialCurrentUserState.avatar}</span>`;
    }
  }
  messageDiv.innerHTML = `${avatar}<div class="message-content">${message}</div>`;
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  messageDiv.style.opacity = "0"; messageDiv.style.transform = "translateY(20px)";
  setTimeout(() => {
    messageDiv.style.transition = "all 0.3s ease";
    messageDiv.style.opacity = "1"; messageDiv.style.transform = "translateY(0)";
  }, 100);
}

function generateChatResponse(message) { 
  const lowerMessage = message.toLowerCase();
  if (lowerMessage.includes("điểm")) return `Em hiện có ${currentUser.points} điểm! Cố lên nhé! 💎`;
  if (lowerMessage.includes("thú cưng")) return currentUser.pets.length > 0 ? `Em có ${currentUser.pets.length} thú cưng đáng yêu! 🐾` : "Em chưa có thú cưng. Mua một bé ở cửa hàng nhé! 🛒";
  const responses = ["Cô hiểu rồi! 😊", "Tuyệt vời! Em giỏi lắm! 🌟", "Cố gắng nhé! 💪"];
  return responses[Math.floor(Math.random() * responses.length)];
}

// Pet Emotion System
function updatePetEmotion(completedTasks) {
  const petEmotionIcon = document.getElementById("petEmotionIcon");
  if (!petEmotionIcon) return;
  if (completedTasks === 5) petEmotionIcon.textContent = "😄";
  else if (completedTasks >= 3) petEmotionIcon.textContent = "😊";
  else if (completedTasks >= 1) petEmotionIcon.textContent = "😐";
  else petEmotionIcon.textContent = "😢";
}

function showPetInteraction() {
  const currentEmotion = document.getElementById("petEmotionIcon").textContent;
  let message = "";
  switch (currentEmotion) {
    case "😄": message = "Thú cưng rất vui vì em đã hoàn thành tất cả nhiệm vụ! 🎉"; break;
    case "😊": message = "Thú cưng hài lòng với tiến độ của em! 👍"; break;
    case "😐": message = "Thú cưng nghĩ em nên làm thêm vài nhiệm vụ nữa! 📚"; break;
    case "😢": message = "Thú cưng buồn vì em chưa làm nhiệm vụ nào... 😿"; break;
  }
  showNotification(message, "info"); addChatMessage("bot", message);
}

// Settings System
function updateSettings() {
  const font = document.getElementById("fontSelect").value;
  const fontSize = document.getElementById("fontSizeSelect").value;
  const sound = document.getElementById("soundToggle").checked;

  currentUser.settings.font = font;
  currentUser.settings.fontSize = fontSize;
  currentUser.settings.sound = sound;

  document.body.style.fontFamily = font === "Inter" ? "'Inter', sans-serif" : font === "Baloo 2" ? "'Baloo 2', cursive" : "'Comic Neue', cursive";
  document.body.className = document.body.className.replace(/font-\w+/g, ""); 
  document.body.classList.add(`font-${fontSize}`); 


  saveUserData(); showNotification("⚙️ Đã cập nhật cài đặt!", "success");
  console.log(`⚙️ Cập nhật cài đặt: Font=${font}, Size=${fontSize}, Sound=${sound}`);
}

function selectColor(e) {
  document.querySelectorAll(".color-option").forEach((opt) => opt.classList.remove("selected"));
  e.target.classList.add("selected");
  const color = e.target.dataset.color;
  currentUser.settings.backgroundColor = color;
  document.body.className = document.body.className.replace(/\bbg-\w+\b/g, "");
  if (color !== "default") document.body.classList.add(`bg-${color}`);
  saveUserData(); showNotification(`🎨 Đã thay đổi màu nền thành ${color}!`, "success");
}

// Statistics and Progress
function updateStats() {
  const elements = {
    totalQuizzes: currentUser.totalQuizzes,
    correctAnswers: currentUser.correctAnswers,
    totalPoints: currentUser.points,
    streak: currentUser.streak,
  };
  Object.entries(elements).forEach(([id, value]) => {
    const element = document.getElementById(id);
    if (element) {
      const currentValue = Number.parseInt(element.textContent) || 0;
      if (currentValue !== value && !isNaN(value)) animateNumber(element, currentValue, value); 
      else if (!isNaN(value)) element.textContent = value;
      else element.textContent = 0; 
    }
  });
}

function animateNumber(element, start, end) {
  const duration = 1000; const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const current = Math.floor(start + (end - start) * progress);
    element.textContent = current;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function updateStreakCounter() {
  const today = new Date().toDateString();
  const lastLogin = currentUser.lastLoginDate;

  if (lastLogin) {
    const lastDate = new Date(lastLogin);
    const todayDate = new Date(today); 
    lastDate.setHours(0,0,0,0);
    todayDate.setHours(0,0,0,0);

    const diffTime = todayDate.getTime() - lastDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) currentUser.streak++;
    else if (diffDays > 1) currentUser.streak = 1; 
  } else {
    currentUser.streak = 1; 
  }
  currentUser.lastLoginDate = today; 
  console.log(`🔥 Streak hiện tại: ${currentUser.streak} ngày. Ngày đăng nhập cuối: ${lastLogin}, Hôm nay: ${today}`);
}

// User Display
function updateUserDisplay() {
  const userAvatarElement = document.getElementById("userAvatar");
  const userNameElement = document.getElementById("userName");
  const userPointsElement = document.getElementById("userPoints");
  const dailyQuizCountElement = document.getElementById("dailyQuizCountDisplay"); 
  const welcomeGreeting = document.getElementById("welcomeGreeting");

  if (userAvatarElement) {
    if (currentUser.avatar && typeof currentUser.avatar === 'string' && currentUser.avatar.includes("images/")) {
      userAvatarElement.innerHTML = `<img src="${currentUser.avatar}" alt="Avatar" class="user-avatar-image">`;
    } else if (currentUser.avatar && typeof currentUser.avatar === 'string') { 
      userAvatarElement.textContent = currentUser.avatar;
    } else { 
      userAvatarElement.textContent = initialCurrentUserState.avatar;
    }
  }

  if (userNameElement) userNameElement.textContent = currentUser.name || "Bé yêu";
  if (userPointsElement) userPointsElement.textContent = `${currentUser.points} điểm 💎`;
  if (dailyQuizCountElement) dailyQuizCountElement.textContent = currentUser.dailyQuizCount; 

  if (welcomeGreeting && currentUser.name) {
    const timeOfDay = new Date().getHours(); let greeting = "";
    if (timeOfDay < 12) greeting = `Chào buổi sáng, ${currentUser.name}!`;
    else if (timeOfDay < 18) greeting = `Chào buổi chiều, ${currentUser.name}!`;
    else greeting = `Chào buổi tối, ${currentUser.name}!`;
    welcomeGreeting.textContent = greeting;
  }
  updateStats(); 
}

function updateProgressDisplay() {
  updateTaskProgress();
  updatePetDisplay();
  updateUserDisplay();
  updateAchievements();
  updatePetCollectionDisplay(); 
}

// Notification System
function showNotification(message, type = "info") {
  const notificationArea = document.body; 
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  
  let borderColor = "";
  switch(type) {
    case "success": borderColor = "var(--success-color)"; break;
    case "warning": borderColor = "var(--warning-color)"; break;
    case "error": borderColor = "var(--error-color)"; break;
    default: borderColor = "var(--primary-color)";
  }

  notification.style.cssText = `
    position:fixed; top:20px; right:20px;
    background:white; border-radius:8px; padding:16px;
    box-shadow:0 4px 12px rgba(0,0,0,0.15); z-index:1001;
    max-width:300px; transform:translateX(120%);
    transition:transform 0.3s ease-in-out;
    border-left: 4px solid ${borderColor};
    display: flex; align-items: center; justify-content: space-between;
  `;
  
  const messageSpan = document.createElement("span");
  messageSpan.textContent = message;
  messageSpan.style.flexGrow = "1";

  const closeButton = document.createElement("button");
  closeButton.innerHTML = "×"; 
  closeButton.className = "notification-close"; 
  closeButton.style.cssText = `
    background:none; border:none; font-size:1.5rem; color:var(--text-muted);
    cursor:pointer; padding:0 0 0 10px; line-height:1;
  `;
  
  notification.appendChild(messageSpan);
  notification.appendChild(closeButton);
  notificationArea.appendChild(notification);

  setTimeout(() => notification.style.transform = "translateX(0)", 50); 

  const autoDismissTimer = setTimeout(() => {
    notification.style.transform = "translateX(120%)";
    setTimeout(() => { if (notificationArea.contains(notification)) notificationArea.removeChild(notification); }, 300);
  }, 3000);

  closeButton.addEventListener("click", () => {
    clearTimeout(autoDismissTimer);
    notification.style.transform = "translateX(120%)";
    setTimeout(() => { if (notificationArea.contains(notification)) notificationArea.removeChild(notification); }, 300);
  });
}

// Utility Functions
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function getRandomByDistribution(distribution) {
  const random = Math.random(); let sum = 0;
  for (let i = 0; i < distribution.length; i++) {
    sum += distribution[i]; if (random <= sum) return i;
  }
  return distribution.length - 1;
}

// Animation Functions
function showSuccessAnimation() {
  const element = document.getElementById("currentScore");
  if (element) {
    element.classList.add("success-animation");
    setTimeout(() => element.classList.remove("success-animation"), 600);
  }
}
function showTaskCompleteAnimation(element) {
  element.classList.add("animate-bounce");
  setTimeout(() => element.classList.remove("animate-bounce"), 2000);
}

function showFireworks() {
    const fireworksContainer = document.createElement('div');
    fireworksContainer.style.position = 'fixed';
    fireworksContainer.style.top = '0';
    fireworksContainer.style.left = '0';
    fireworksContainer.style.width = '100%';
    fireworksContainer.style.height = '100%';
    fireworksContainer.style.pointerEvents = 'none';
    fireworksContainer.style.zIndex = '9999';
    document.body.appendChild(fireworksContainer);

    for (let i = 0; i < 15; i++) { 
        setTimeout(() => {
            createFireworkParticle(fireworksContainer);
        }, i * 150); 
    }

    setTimeout(() => {
        if (document.body.contains(fireworksContainer)) {
             document.body.removeChild(fireworksContainer);
        }
    }, 3000); 
}

function createFireworkParticle(container) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight * 0.7; 
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '5px';
    particle.style.height = '5px';
    const colors = ['#FF5733', '#FFC300', '#DAF7A6', '#76D7C4', '#8E44AD'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.borderRadius = '50%';
    particle.style.opacity = '1';
    
    container.appendChild(particle);

    for (let j = 0; j < 10; j++) { 
        const spark = document.createElement('div');
        spark.style.position = 'absolute';
        spark.style.left = x + 'px';
        spark.style.top = y + 'px';
        spark.style.width = '3px';
        spark.style.height = '3px';
        spark.style.background = particle.style.background;
        spark.style.borderRadius = '50%';
        spark.style.opacity = '1';
        container.appendChild(spark);

        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 50 + 20; 
        const duration = Math.random() * 0.5 + 0.5; 

        spark.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'ease-out',
            fill: 'forwards'
        });
        setTimeout(() => { if(container.contains(spark)) container.removeChild(spark); }, duration * 1000);
    }
     setTimeout(() => { if(container.contains(particle)) container.removeChild(particle); }, 500); 
}


// Sound Functions
function playSound(type) {
  if (!currentUser.settings.sound) return;
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const sounds = {
      correct: { frequency: 800, duration: 0.2, type: "sine" },
      incorrect: { frequency: 300, duration: 0.3, type: "sawtooth" },
      complete: { frequency: 600, duration: 0.5, type: "sine" },
      perfect: { frequency: 1000, duration: 0.8, type: "sine" },
      purchase: { frequency: 700, duration: 0.3, type: "triangle" },
      select: { frequency: 500, duration: 0.1, type: "sine" },
    };
    const sound = sounds[type]; if (!sound) return;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode); gainNode.connect(audioContext.destination);
    oscillator.frequency.setValueAtTime(sound.frequency, audioContext.currentTime);
    oscillator.type = sound.type;
    gainNode.gain.setValueAtTime(0.03, audioContext.currentTime); 
    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + sound.duration); 
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + sound.duration);
  } catch (error) {
    console.warn(`🔇 Không thể phát âm thanh (${type}):`, error);
  }
}

// Data Persistence
function saveUserData() {
  if (!currentUser.name) {
    return;
  }
  try {
    const dataToSave = { ...currentUser, lastSaved: new Date().toISOString() };
    const userKey = `sarahLearningApp_${currentUser.name}`; 
    localStorage.setItem(userKey, JSON.stringify(dataToSave));
    localStorage.setItem("sarahLearningApp_lastActiveUser", currentUser.name); 
  } catch (error) {
    console.error("❌ Không thể lưu dữ liệu:", error);
    showNotification("Không thể lưu dữ liệu!", "error");
  }
}

function loadUserData() {
  try {
    const lastActiveUserName = localStorage.getItem("sarahLearningApp_lastActiveUser");
    let userLoaded = false;

    if (lastActiveUserName) {
      const userKey = `sarahLearningApp_${lastActiveUserName}`;
      const savedData = localStorage.getItem(userKey);
      if (savedData) {
        const savedUser = JSON.parse(savedData);
        currentUser = { 
            ...JSON.parse(JSON.stringify(initialCurrentUserState)), 
            ...savedUser 
        };
        currentUser.settings = { 
            ...initialCurrentUserState.settings, 
            ...(savedUser.settings || {}) 
        };
        if (currentUser.pets && currentUser.pets.length > 0) {
            currentUser.pets.forEach(pet => {
                if (!pet.accessories) {
                    pet.accessories = [];
                }
            });
        }

        userLoaded = true;
        console.log(`📂 Đã tải dữ liệu cho người dùng hoạt động cuối cùng: ${currentUser.name} (Key: ${userKey})`);
      } else {
        console.log(`🤷 Không tìm thấy dữ liệu cho người dùng hoạt động cuối cùng: ${lastActiveUserName}.`);
      }
    }

    if (!userLoaded) {
      currentUser = JSON.parse(JSON.stringify(initialCurrentUserState));
      console.log("👤 Không có người dùng nào được tải, bắt đầu với trạng thái mặc định.");
    }

    if (currentUser.settings) {
      const fontFamily = currentUser.settings.font === "Inter" ? "'Inter', sans-serif" : currentUser.settings.font === "Baloo 2" ? "'Baloo 2', cursive" : "'Comic Neue', cursive";
      document.body.style.fontFamily = fontFamily;
      
      document.body.className = document.body.className.replace(/font-\w+/g, "");
      document.body.classList.add(`font-${currentUser.settings.fontSize || initialCurrentUserState.settings.fontSize}`);
      
      document.body.className = document.body.className.replace(/\bbg-\w+\b/g, "");
      if (currentUser.settings.backgroundColor && currentUser.settings.backgroundColor !== "default") {
        document.body.classList.add(`bg-${currentUser.settings.backgroundColor}`);
      }
      
      setTimeout(() => { 
        const fontSelect = document.getElementById("fontSelect");
        const fontSizeSelect = document.getElementById("fontSizeSelect");
        const soundToggle = document.getElementById("soundToggle");
        const colorOptions = document.querySelectorAll(".color-option");

        if (fontSelect) fontSelect.value = currentUser.settings.font || initialCurrentUserState.settings.font;
        if (fontSizeSelect) fontSizeSelect.value = currentUser.settings.fontSize || initialCurrentUserState.settings.fontSize;
        if (soundToggle) soundToggle.checked = typeof currentUser.settings.sound === 'boolean' ? currentUser.settings.sound : initialCurrentUserState.settings.sound;
        
        colorOptions.forEach(opt => {
            opt.classList.remove("selected");
            if (opt.dataset.color === (currentUser.settings.backgroundColor || initialCurrentUserState.settings.backgroundColor)) {
                opt.classList.add("selected");
            }
        });
      }, 100);
    }
  } catch (error) {
    console.error("❌ Không thể tải dữ liệu:", error);
    currentUser = JSON.parse(JSON.stringify(initialCurrentUserState)); 
    showNotification("Không thể tải dữ liệu đã lưu! Bắt đầu với cài đặt mặc định.", "warning");
  }
}


// Daily Reset System
function checkDailyReset() {
  const today = new Date().toDateString();
  const lastResetKey = currentUser.name ? `lastReset_${currentUser.name}` : 'lastReset_defaultUser';
  const lastReset = localStorage.getItem(lastResetKey);

  if (lastReset !== today) {
    console.log(`🌅 Reset dữ liệu hàng ngày cho ${currentUser.name || 'người dùng hiện tại'}`);
    currentUser.dailyQuizCount = 0;
    currentUser.completedTasks = []; 
    
    setTimeout(() => {
      document.querySelectorAll('.task-item input[type="checkbox"]').forEach((cb) => {
        cb.checked = false; 
        cb.closest(".task-item").classList.remove("completed");
      });
      updateTaskProgress(); 
    }, 100);


    currentUser.pets.forEach((pet) => {
      pet.hunger = Math.min(100, (pet.hunger || 0) + 20); 
      pet.happiness = Math.max(50, (pet.happiness || 100) - 10); 
    });

    saveUserData();
    localStorage.setItem(lastResetKey, today);

    if (currentUser.name) { 
      setTimeout(() => showNotification("🌅 Chào ngày mới! Nhiệm vụ hôm nay đã được reset!", "info"), 2000);
    }
  }
}

// Performance monitoring
function logPerformance(action, duration) { console.log(`⚡ ${action}: ${duration.toFixed(2)}ms`); }

// Error handling
window.addEventListener("error", (event) => {
  console.error("🚨 JavaScript Error:", event.error, "At:", event.filename, event.lineno);
  performanceMetrics.errorsEncountered++;
});
window.addEventListener('unhandledrejection', function(event) {
  console.error('🚨 Unhandled Promise Rejection:', event.reason);
  performanceMetrics.errorsEncountered++;
});


// Auto-save system
setInterval(() => { if (currentUser.name) saveUserData(); }, 60000); 
setInterval(checkDailyReset, 60000 * 5); 

window.addEventListener("beforeunload", () => { if (currentUser.name) saveUserData(); });

console.log("🚀 Sarah Learning App đã khởi động thành công!");
console.log(`📊 Thời gian khởi động: ${(performance.now() - performanceMetrics.startTime).toFixed(2)}ms`);

if (typeof window !== "undefined") {
  window.sarahApp = { currentUser, currentQuiz, shopItems, saveUserData, loadUserData, showNotification, performanceMetrics };
}