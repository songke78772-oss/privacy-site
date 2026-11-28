// public/js/i18n.js
const translations = {
  en: {
    nav_logout: "Logout",
    nav_login: "Login",
    nav_signup: "Sign Up",
    hero_title: "Privacy Tools",
    hero_desc: "Encryption happens in your browser. The server never sees your data.",
    tool_emberlink_desc: "Share a message that self-destructs after reading. Encrypted in your browser.",
    tool_keydrop_desc: "Encrypt a file in your browser. The key never leaves your device.",
    tool_burnchat_desc: "Create a temporary chat room that disappears after use. Optional client-side encryption.",
    // EmberLink
    ember_title: "EmberLink",
    ember_desc: "Share a message that self-destructs after reading.",
    ember_create: "Create Link",
    ember_message: "Message",
    ember_expire: "Expire after",
    ember_hours: "hours",
    ember_generate: "Generate Link",
    // KeyDrop
    keydrop_title: "KeyDrop",
    keydrop_desc: "Encrypt a file in your browser. The key never leaves your device.",
    // Burn Chat
    burn_create: "Create Room",
    burn_join: "Join Room",
    burn_room_name: "Room Name",
    burn_password: "Password (optional)",
    burn_duration: "Duration",
    burn_create_btn: "Create Room",
    burn_join_btn: "Join",
    // Common
    lang_en: "English",
    lang_zh: "中文",
    lang_es: "Español",
    lang_ja: "日本語",
    lang_ko: "한국어",
    lang_ar: "العربية"
  },
  zh: {
    nav_logout: "退出",
    nav_login: "登录",
    nav_signup: "注册",
    hero_title: "隐私工具",
    hero_desc: "加密在您的浏览器中完成，服务器永远看不到您的数据。",
    tool_emberlink_desc: "分享阅后即焚的消息，在浏览器内加密。",
    tool_keydrop_desc: "在浏览器中加密文件，密钥永不离开您的设备。",
    tool_burnchat_desc: "创建临时聊天室，使用后自动消失。支持客户端加密。",
    ember_title: "EmberLink",
    ember_desc: "分享阅后即焚的消息。",
    ember_create: "创建链接",
    ember_message: "消息内容",
    ember_expire: "过期时间",
    ember_hours: "小时",
    ember_generate: "生成链接",
    keydrop_title: "KeyDrop",
    keydrop_desc: "在浏览器中加密文件，密钥永不离开设备。",
    burn_create: "创建房间",
    burn_join: "加入房间",
    burn_room_name: "房间名称",
    burn_password: "密码（可选）",
    burn_duration: "持续时间",
    burn_create_btn: "创建房间",
    burn_join_btn: "加入",
    lang_en: "English",
    lang_zh: "中文",
    lang_es: "Español",
    lang_ja: "日本語",
    lang_ko: "한국어",
    lang_ar: "العربية"
  },
  es: {
    nav_logout: "Cerrar sesión",
    nav_login: "Iniciar sesión",
    nav_signup: "Registrarse",
    hero_title: "Herramientas de Privacidad",
    hero_desc: "El cifrado ocurre en tu navegador. El servidor nunca ve tus datos.",
    tool_emberlink_desc: "Comparte un mensaje que se autodestruye después de leerlo. Cifrado en tu navegador.",
    tool_keydrop_desc: "Cifra un archivo en tu navegador. La clave nunca sale de tu dispositivo.",
    tool_burnchat_desc: "Crea una sala de chat temporal que desaparece después de usarla.",
    ember_title: "EmberLink",
    ember_desc: "Comparte un mensaje que se autodestruye.",
    ember_create: "Crear enlace",
    ember_message: "Mensaje",
    ember_expire: "Expira después de",
    ember_hours: "horas",
    ember_generate: "Generar enlace",
    keydrop_title: "KeyDrop",
    keydrop_desc: "Cifra un archivo en tu navegador. La clave nunca sale del dispositivo.",
    burn_create: "Crear sala",
    burn_join: "Unirse a sala",
    burn_room_name: "Nombre de la sala",
    burn_password: "Contraseña (opcional)",
    burn_duration: "Duración",
    burn_create_btn: "Crear sala",
    burn_join_btn: "Unirse",
    lang_en: "English",
    lang_zh: "中文",
    lang_es: "Español",
    lang_ja: "日本語",
    lang_ko: "한국어",
    lang_ar: "العربية"
  },
  ja: {
    nav_logout: "ログアウト",
    nav_login: "ログイン",
    nav_signup: "登録",
    hero_title: "プライバシツール",
    hero_desc: "暗号化はブラウザ内で行われます。サーバーはデータを見ません。",
    tool_emberlink_desc: "読んだ後に自己消滅するメッセージを共有。ブラウザ内で暗号化。",
    tool_keydrop_desc: "ブラウザでファイルを暗号化。鍵はデバイスから出ません。",
    tool_burnchat_desc: "使用後に消滅する一時的なチャットルームを作成。",
    ember_title: "EmberLink",
    ember_desc: "読んだ後に自己消滅するメッセージを共有。",
    ember_create: "リンクを作成",
    ember_message: "メッセージ",
    ember_expire: "有効期限",
    ember_hours: "時間",
    ember_generate: "リンクを生成",
    keydrop_title: "KeyDrop",
    keydrop_desc: "ブラウザでファイルを暗号化。鍵はデバイスから出ません。",
    burn_create: "ルームを作成",
    burn_join: "ルームに参加",
    burn_room_name: "ルーム名",
    burn_password: "パスワード（任意）",
    burn_duration: "持続時間",
    burn_create_btn: "作成",
    burn_join_btn: "参加",
    lang_en: "English",
    lang_zh: "中文",
    lang_es: "Español",
    lang_ja: "日本語",
    lang_ko: "한국어",
    lang_ar: "العربية"
  },
  ko: {
    nav_logout: "로그아웃",
    nav_login: "로그인",
    nav_signup: "회원가입",
    hero_title: "프라이버시 도구",
    hero_desc: "암호화는 브라우저에서 이루어집니다. 서버는 데이터를 볼 수 없습니다.",
    tool_emberlink_desc: "읽은 후 자동 삭제되는 메시지를 공유합니다. 브라우저에서 암호화됩니다.",
    tool_keydrop_desc: "브라우저에서 파일을 암호화합니다. 키는 기기를 떠나지 않습니다.",
    tool_burnchat_desc: "사용 후 사라지는 임시 채팅방을 만듭니다.",
    ember_title: "EmberLink",
    ember_desc: "읽은 후 자동 삭제되는 메시지를 공유합니다.",
    ember_create: "링크 생성",
    ember_message: "메시지",
    ember_expire: "만료 시간",
    ember_hours: "시간",
    ember_generate: "링크 생성",
    keydrop_title: "KeyDrop",
    keydrop_desc: "브라우저에서 파일을 암호화합니다. 키는 기기를 떠나지 않습니다.",
    burn_create: "방 만들기",
    burn_join: "방 참여",
    burn_room_name: "방 이름",
    burn_password: "비밀번호 (선택)",
    burn_duration: "지속 시간",
    burn_create_btn: "방 만들기",
    burn_join_btn: "참여",
    lang_en: "English",
    lang_zh: "中文",
    lang_es: "Español",
    lang_ja: "日本語",
    lang_ko: "한국어",
    lang_ar: "العربية"
  },
  ar: {
    nav_logout: "تسجيل الخروج",
    nav_login: "تسجيل الدخول",
    nav_signup: "إنشاء حساب",
    hero_title: "أدوات الخصوصية",
    hero_desc: "يتم التشفير في متصفحك. الخادم لا يرى بياناتك أبداً.",
    tool_emberlink_desc: "شارك رسالة تختفي بعد قراءتها. مشفرة في متصفحك.",
    tool_keydrop_desc: "شفر ملفاً في متصفحك. المفتاح لا يغادر جهازك أبداً.",
    tool_burnchat_desc: "أنشئ غرفة دردشة مؤقتة تختفي بعد الاستخدام.",
    ember_title: "EmberLink",
    ember_desc: "شارك رسالة تختفي بعد قراءتها.",
    ember_create: "إنشاء رابط",
    ember_message: "الرسالة",
    ember_expire: "تنتهي بعد",
    ember_hours: "ساعات",
    ember_generate: "إنشاء الرابط",
    keydrop_title: "KeyDrop",
    keydrop_desc: "شفر ملفاً في متصفحك. المفتاح لا يغادر جهازك.",
    burn_create: "إنشاء غرفة",
    burn_join: "الانضمام إلى الغرفة",
    burn_room_name: "اسم الغرفة",
    burn_password: "كلمة المرور (اختياري)",
    burn_duration: "المدة",
    burn_create_btn: "إنشاء غرفة",
    burn_join_btn: "انضمام",
    lang_en: "English",
    lang_zh: "中文",
    lang_es: "Español",
    lang_ja: "日本語",
    lang_ko: "한국어",
    lang_ar: "العربية"
  }
};

function setLanguage(lang) {
  if (!translations[lang]) lang = 'en';
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });
}

function initI18n() {
  const saved = localStorage.getItem('lang') || navigator.language.split('-')[0] || 'en';
  const lang = translations[saved] ? saved : 'en';
  setLanguage(lang);

  // Language switcher
  const switcher = document.getElementById('lang-switcher');
  if (switcher) {
    switcher.value = lang;
    switcher.addEventListener('change', (e) => setLanguage(e.target.value));
  }
}

document.addEventListener('DOMContentLoaded', initI18n);
