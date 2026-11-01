/* 发小明 · 教师创新力特训营 — 课程内容
   以“怎么点燃学生”为主线；不论证要不要创新。 */
window.FXM_COURSE = {
  meta: {
    title: "先点亮自己",
    sub: "发小明创新教育 · 学校教师特训营",
    meta: "2 天 1 夜 · 10 个航段 · 40 节课地图",
    version: "V2.0 · 2026.11"
  },
  sessions: [
    {
      id: "s0", num: "00", title: "点亮", en: "LIGHT", color: "gold", minutes: 20,
      subtitle: "先回到学生的位置",
      scenes: [
        {
          type: "cover", kicker: "TEACHER ACADEMY · 2 天 1 夜",
          title: "先点亮自己",
          lead: "这不是一场培训。这是一次重新当学生的机会。",
          image: "assets-lamp.svg", imageSide: "right",
          note: "20 分钟。开场不要讲意义、不要讲政策。让老师先回到学生的位置：好奇、犹豫、想试试。"
        },
        {
          type: "story", kicker: "课堂片段 · 01",
          title: "“我想不出来。”",
          body: [
            "阿哲，三年级。每次发下材料，他都说同一句话：“我想不出来。”",
            "老师没有说“再想想”，也没有替他做。她给了一个限制：<b>“不用电，只能用纸板、绳子和橡皮筋，做一个能让橡皮不滚下桌的东西。”</b>",
            "阿哲做了三个，都失败。第四个，他把纸板折成凹槽，又在两边绑了橡皮筋。橡皮停住了。",
            "他抬头说：“原来我不是想不出来，是我想得太大了。”"
          ],
          quote: "原来我不是想不出来，是我想得太大了。",
          by: "阿哲 · 三年级 · 人物为化名",
          image: "assets-paperclip.svg",
          note: "8 分钟。讲完停 5 秒，问：“你班上谁说过这句话？”不要急着总结；下一页再做三选一。"
        },
        {
          type: "widget", kicker: "做一次 · 第一句话",
          title: "如果是你，你会怎么接？",
          lead: "同一句话，三种接法。点一张，看看孩子下一步会发生什么。",
          widget: "first-response",
          note: "8 分钟。每位老师先选一个，再点开看后果。重点讨论：第三种为什么能让孩子开始动手？"
        },
        {
          type: "split", kicker: "今天只做三件事",
          title: "只讨论：明天怎么上",
          lead: "把抽象的理念，换成三个可以带走的动作。",
          cards: [
            { num: "01", title: "看见一个孩子", body: "从他的一句“我想不出来”里，找到真正卡住他的地方。", accent: "gold" },
            { num: "02", title: "拆一节课", body: "把一节课拆成七个教学动作，知道哪一句该说、哪一句该晚说。", accent: "teal" },
            { num: "03", title: "上一段给别人看", body: "5 分钟微试讲，拿到一条具体反馈，回校就能用。", accent: "coral" }
          ],
          note: "5 分钟。让老师知道这两天不是“听”，而是“做”。每一条都指向一个产出。"
        },
        {
          type: "route", kicker: "一条航线 · 10 个航段",
          title: "你可以随时回来复习",
          lead: "第一次建议按顺序走；第二次可以跳到你最需要的那一段。",
          widget: "ticket",
          note: "7 分钟。让每位老师在船票上写一个“我今天想带走的问题”，贴到墙上。这个问题会在最后一天被重新拿出来。"
        }
      ]
    },
    {
      id: "s1", num: "01", title: "看见", en: "SEE", color: "teal", minutes: 35,
      subtitle: "孩子不缺答案，缺的是把问题看准",
      scenes: [
        {
          type: "cover", kicker: "航段 01 · 看见",
          title: "先看见，再解决",
          lead: "一个孩子看见水杯倒了，可能马上想给杯子加底座；但真正的问题，也许是桌面不平、空间太小，或者杯子放在了桌边。",
          image: "assets-classroom.jpg", imageSide: "right",
          note: "5 分钟。不要讲“观察很重要”，直接问：“你班上最常出现的‘小麻烦’是什么？”收 3 个例子，进入故事。"
        },
        {
          type: "story", kicker: "课堂片段 · 02",
          title: "奶奶的眼镜",
          body: [
            "小满想给奶奶做一个“找眼镜”的盒子。第一次，她做了一个 30 厘米的大盒子，里面有灯、有音乐、有提醒。",
            "奶奶试了一次，说：“太大了，放哪儿都碍事。”",
            "小满没有重做。她只改了一个地方：把盒子分成两格，一格放眼镜，一格放遥控器。盒子变小了，奶奶开始用。",
            "她说：“我以前以为发明要很厉害，原来只要改一个地方。”"
          ],
          quote: "原来只要改一个地方。",
          by: "小满 · 四年级 · 人物为化名",
          image: "assets-glasses.svg",
          note: "8 分钟。重点不是“孝顺”，而是“用户反馈改变了设计”。问：“小满改的是功能，还是使用场景？”"
        },
        {
          type: "widget", kicker: "做一次 · 问题侦探",
          title: "这间教室里，藏着 6 个“不方便”",
          lead: "点一点发光的位置，把问题收进采集袋。找到 3 个，再选一个最想研究的。",
          widget: "hotspots",
          note: "12 分钟。让老师像学生一样先找 3 个，不许马上想解决办法。追问：“你看到的是现象，还是你猜的原因？”"
        },
        {
          type: "bridge", kicker: "带走 · 问题卡",
          title: "把“抱怨”变成“可以调查的问题”",
          takeaways: [
            "先分清现象和猜测：他看到了什么？他猜的是什么？",
            "再追问：谁、何时、哪里、多久一次。",
            "最后排序：哪个问题最值得研究？不是哪个最容易做。"
          ],
          tool: { title: "问题卡", desc: "A5 双面，学生用；也可打印成 A4 贴在教室墙上。", href: "pdf/问题卡.pdf", label: "下载问题卡 PDF" },
          next: "下一段：把答案晚说 30 秒",
          note: "5 分钟。让老师用一句话写下“我班上最值得研究的一个问题”，带走。"
        }
      ]
    },
    {
      id: "s2", num: "02", title: "提问", en: "ASK", color: "coral", minutes: 30,
      subtitle: "好问题，比好答案更稀缺",
      scenes: [
        {
          type: "cover", kicker: "航段 02 · 提问",
          title: "把答案，晚说 30 秒",
          lead: "孩子说“水杯总是倒”。你第一句话说什么，决定了他接下来是等答案，还是开始思考。",
          image: "assets-classroom.jpg", imageSide: "right",
          note: "5 分钟。先不解释。直接进入下面的三选一，让老师自己看到差别。"
        },
        {
          type: "widget", kicker: "做一次 · 老师的一句话",
          title: "同一句话，三种接法",
          lead: "点每一张卡，看看孩子下一步会发生什么。",
          widget: "responses",
          note: "12 分钟。每位老师先选一个，再点开看后果。重点讨论：第三种为什么能让孩子的想法变多？"
        },
        {
          type: "widget", kicker: "带得走 · 五个追问",
          title: "五个问题，让想法继续长",
          lead: "不用记理论，只记五句话。",
          widget: "fiveq",
          note: "8 分钟。让老师选一句，现场对同伴用一次。不要解释，直接练。"
        },
        {
          type: "bridge", kicker: "带走 · 提问卡",
          title: "三句不要说，五句可以问",
          takeaways: [
            "“这个做不出来” → “先记下来，等会儿一起看。”",
            "“不对” → “你怎么知道？还有别的可能吗？”",
            "“我来帮你做” → “你想先试哪一步？”"
          ],
          tool: { title: "课堂提问卡", desc: "A4 一张，正面五句追问，背面三句替代话术。", href: "pdf/课堂提问卡.pdf", label: "下载提问卡 PDF" },
          next: "下一段：先让数量出来",
          note: "5 分钟。让老师在卡片背面写一句“我明天要少说的一句话”。"
        }
      ]
    },
    {
      id: "s3", num: "03", title: "想象", en: "IDEATE", color: "violet", minutes: 40,
      subtitle: "先让数量出来，再让质量发生",
      scenes: [
        {
          type: "cover", kicker: "航段 03 · 想象",
          title: "先让数量出来",
          lead: "发散阶段最忌讳的一句话，是“这个做不出来”。",
          image: "assets-pencil-orb.jpg", imageSide: "right",
          note: "5 分钟。让老师回忆：上一次班上有 20 个以上的想法，是什么时候？为什么？"
        },
        {
          type: "widget", kicker: "五个工具 · SIT",
          title: "同一个问题，五种长法",
          lead: "点每一张卡，看一个例子。工具不是公式，是逼自己换一个方向。",
          widget: "tools",
          note: "10 分钟。不要讲工具定义，直接看例子；让老师选一个“明天就想试”的工具。"
        },
        {
          type: "widget", kicker: "玩一次 · 创意骰子",
          title: "摇一个限制，逼出三个想法",
          lead: "限制不是束缚，是让想法有地方落脚。摇一次，写三个，再摇一次。",
          widget: "dice",
          note: "15 分钟。每人至少写 3 个想法，不许评价。写不出来就再摇一次；不允许说“不可能”。"
        },
        {
          type: "bridge", kicker: "带走 · 创意卡",
          title: "先数量，后质量；先接住，再筛选",
          takeaways: [
            "发散时，老师只做三件事：给限制、记下来、追问还有吗。",
            "三个想法雷同，就换一个工具，不要重复同一个方向。",
            "筛选留到后面；发散阶段说“不可能”，等于把门关上。"
          ],
          tool: { title: "创意卡", desc: "A5 双面，五种工具 + 六个限制角度。", href: "pdf/创意卡.pdf", label: "下载创意卡 PDF" },
          next: "下一段：一张能做的图",
          note: "5 分钟。让老师把最想试的一个想法写在便利贴上，贴到“明天想试”墙。"
        }
      ]
    },
    {
      id: "s4", num: "04", title: "设计", en: "DESIGN", color: "sky", minutes: 35,
      subtitle: "在动手之前，先想清楚要解决什么",
      scenes: [
        {
          type: "cover", kicker: "航段 04 · 设计",
          title: "一张能做的图",
          lead: "设计图不是画得漂亮，是能指导下一步：用什么材料、先做哪一部分、怎么测试。",
          image: "assets-camera.jpg", imageSide: "right",
          note: "5 分钟。先问：“你班上孩子画设计图时，最常漏掉什么？”收 3 个答案。"
        },
        {
          type: "widget", kicker: "做一次 · 设计画布",
          title: "四个问题，把想法落到纸上",
          lead: "点每一个问题，看它为什么重要。",
          widget: "canvas",
          note: "10 分钟。让老师用自己的一个课堂项目，回答四个问题；不要求画得好看。"
        },
        {
          type: "widget", kicker: "玩一次 · 材料币",
          title: "只有 10 个材料币，你选什么？",
          lead: "材料越多，孩子越不取舍。限制，才会逼出设计。",
          widget: "coins",
          note: "10 分钟。每人选 3–5 样，说一句“我为什么选它”。不要追求“全都买”。"
        },
        {
          type: "bridge", kicker: "带走 · 设计画布",
          title: "先画，再拿材料",
          takeaways: [
            "为谁做？他上一次遇到这个问题是什么时候？",
            "只保留三个功能，并排一个顺序。",
            "先做哪一个功能？怎么证明它有用？"
          ],
          tool: { title: "设计画布", desc: "A4 一张，四个问题 + 一块画图区。", href: "pdf/设计画布.pdf", label: "下载设计画布 PDF" },
          next: "下一段：失败不是判决",
          note: "5 分钟。提醒：设计画布不是作业纸，是孩子和自己对话的工具。"
        }
      ]
    },
    {
      id: "s5", num: "05", title: "创造", en: "MAKE", color: "gold", minutes: 40,
      subtitle: "失败不是判决，是数据",
      scenes: [
        {
          type: "cover", kicker: "航段 05 · 创造",
          title: "失败不是判决，是数据",
          lead: "孩子第一次做出来的东西，几乎一定会倒、会散、会不动。关键不是“再做一次”，而是“这一次留下了什么信息”。",
          image: "assets-tower.svg", imageSide: "right",
          note: "5 分钟。问：“上一次孩子作品失败，你第一句话说了什么？”先不评价。"
        },
        {
          type: "story", kicker: "课堂片段 · 03",
          title: "倒了五次的高塔",
          body: [
            "一组孩子搭纸塔，倒了五次。第五次，塔从中间弯下去，纸板散了一地。",
            "老师没有说“没关系”。她蹲下来问：“它是从哪里开始弯的？”",
            "孩子指着一根支撑说：“这里。”老师又问：“如果只改这一个地方，你改什么？”",
            "第六次，他们把底座从一层加到两层，塔站住了。孩子说：“我们只改了底座。”老师说：“这就是工程。”"
          ],
          quote: "我们只改了底座。",
          by: "五年级工程课 · 人物为化名",
          image: "assets-tower.svg",
          note: "10 分钟。讲完问：“老师说的哪句话，让孩子的注意力从‘失败’转到了‘信息’？”"
        },
        {
          type: "widget", kicker: "做一次 · 失败诊断",
          title: "小车总是往左偏，你先查哪里？",
          lead: "点一个子系统，看看下一步该测什么。",
          widget: "diagnosis",
          note: "10 分钟。允许诊断错；重点是说清“现象 → 证据 → 判断”，不是猜对。"
        },
        {
          type: "bridge", kicker: "带走 · 迭代卡",
          title: "一次只改一个地方",
          takeaways: [
            "先记录：原来以为会发生什么？实际发生了什么？",
            "再判断：哪个环节和预期不一样？",
            "最后决定：下一次只改哪一个变量？"
          ],
          tool: { title: "迭代记录卡", desc: "A5 双面，失败履历 + 下一次只改一处。", href: "pdf/迭代卡.pdf", label: "下载迭代卡 PDF" },
          next: "下一段：60 秒讲清楚",
          note: "5 分钟。让老师写一张自己的“失败履历卡”，不是写学生的。"
        }
      ]
    },
    {
      id: "s6", num: "06", title: "表达", en: "SHARE", color: "teal", minutes: 30,
      subtitle: "讲清楚，比讲得漂亮重要",
      scenes: [
        {
          type: "cover", kicker: "航段 06 · 表达",
          title: "60 秒，讲清楚",
          lead: "不背稿。只练四句话，和接住一个追问。",
          image: "assets-classroom.jpg", imageSide: "right",
          note: "5 分钟。先让一位老师用 30 秒讲一个学生的作品；不评价，只计时。"
        },
        {
          type: "widget", kicker: "四句话 · 路演骨架",
          title: "每一句，只回答一个问题",
          lead: "点每一句，看一个学生的真实说法。",
          widget: "pitch4",
          note: "8 分钟。让老师把四句话抄下来，替换成自己学生的一个作品。"
        },
        {
          type: "widget", kicker: "练一次 · 60 秒",
          title: "现在，讲一个学生的作品",
          lead: "选一个你班上的作品，按四句话讲 60 秒。时间到，停。",
          widget: "pitch",
          note: "12 分钟。两人一组，一人讲一人听；60 秒后听的人只问一个问题。不要点评“好不好”。"
        },
        {
          type: "bridge", kicker: "带走 · 路演卡",
          title: "先理解，再建议",
          takeaways: [
            "可以讨论作品，不能嘲笑做作品的人。",
            "先说“我听懂了什么”，再说“我建议什么”。",
            "每次只给一条建议，具体、可执行。"
          ],
          tool: { title: "路演卡", desc: "A5 双面，四句话 + 同伴反馈句式。", href: "pdf/路演卡.pdf", label: "下载路演卡 PDF" },
          next: "下一段：40 章，怎么装进你的课堂",
          note: "5 分钟。让老师练一句“换一句话”：把“这个不行”改成“我担心……如果……会怎样？”"
        }
      ]
    },
    {
      id: "s7", num: "07", title: "看港", en: "MAP", color: "sky", minutes: 45,
      subtitle: "40 章，不是 40 节课",
      scenes: [
        {
          type: "cover", kicker: "航段 07 · 看港",
          title: "40 章，怎么装进你的课堂",
          lead: "8 条航线、40 个主题单元、约 260 幕互动。不是 40 个 40 分钟，而是一张可以重组的地图。",
          image: "assets-port.png", imageSide: "right",
          note: "5 分钟。先给三个数字：40 章、8 航线、260 幕。不要念目录。"
        },
        {
          type: "widget", kicker: "点一张课卡",
          title: "40 课地图：从“这一章”到“这一类”",
          lead: "点任意一章，看它要解决什么、留下什么、最容易踩什么坑。",
          widget: "map40",
          note: "20 分钟。让每位老师选 3 章：一章马上能上、一章最想上、一章最怕上。分享“最怕”的那一章。"
        },
        {
          type: "widget", kicker: "平台 · 每一幕都自带教案",
          title: "老师打开网页，课堂就开始了",
          lead: "点截图上的热点，看看老师备课时真正要用的四个地方。",
          widget: "platform",
          note: "12 分钟。现场打开课程页，按 T 指引、F 全屏、→ 翻页。让老师自己找到“本幕目标”。"
        },
        {
          type: "bridge", kicker: "带走 · 40 课地图 + 平台卡",
          title: "先选 3 章，不要一次备 40 章",
          takeaways: [
            "一章 = 一个主题单元，不是一节 40 分钟课。",
            "先读 T 指引三行：本幕目标、第一个关键提问、最常见困难。",
            "每节课至少留下一个证据：问题卡 / 设计图 / 测试记录 / 60 秒视频。"
          ],
          tool: { title: "40 课地图", desc: "A4 四页，8 条航线 + 40 章授课要点，可打印。", href: "pdf/40课地图.pdf", label: "下载 40 课地图 PDF" },
          next: "下一段：在你的学校，条件变了怎么办",
          note: "8 分钟。让老师填一张“本校优先开课清单”：先上哪 3 章，为什么。"
        }
      ]
    },
    {
      id: "s8", num: "08", title: "造船", en: "ADAPT", color: "violet", minutes: 45,
      subtitle: "改条件，不改六步法",
      scenes: [
        {
          type: "cover", kicker: "航段 08 · 造船",
          title: "在你的学校，条件变了怎么办？",
          lead: "40 分钟一节课、40–50 人大班、只有投影、没有平板——这些都不是障碍，是设计条件。",
          image: "assets-classroom.jpg", imageSide: "right",
          note: "5 分钟。让老师投票：你学校最大的限制是什么？时间、班额、设备、还是家长？"
        },
        {
          type: "widget", kicker: "三种条件 · 三种改法",
          title: "同一章，可以这样上",
          lead: "点一个条件，看它怎么改。",
          widget: "conditions",
          note: "12 分钟。让老师选一个最接近自己学校的条件，记下一条可以马上用的改法。"
        },
        {
          type: "widget", kicker: "写一页 · 校本教案",
          title: "一页纸，装下一节课",
          lead: "目标、流程、提问、材料、证据。写完就能上。",
          widget: "lessonplan",
          note: "15 分钟。每人写一页，两人交换，只提一个问题：“学生到底留下什么？”"
        },
        {
          type: "widget", kicker: "练一次 · 微试讲",
          title: "5 分钟，只练一个动作",
          lead: "拖动滑块自评；80 分以上通过。不要追求完美，追求“下一次只改一处”。",
          widget: "rubric",
          note: "13 分钟。三人组：1 讲 / 1 当学生 / 1 观察；5 分钟教学 + 3 分钟反馈。只练一个动作。"
        }
      ]
    },
    {
      id: "s9", num: "09", title: "远航", en: "SAIL", color: "gold", minutes: 25,
      subtitle: "培训结束，是第一次上课的开始",
      scenes: [
        {
          type: "cover", kicker: "航段 09 · 远航",
          title: "培训结束，是第一次上课的开始",
          lead: "不要写“提升能力”。写：哪一天、哪个班、第几章、先改哪一个动作。",
          image: "assets-lamp.svg", imageSide: "right",
          note: "5 分钟。让老师把手机日历打开，当场定下第一次上课的日期。"
        },
        {
          type: "widget", kicker: "21 天 · 1-3-1",
          title: "回去以后，只做三件事",
          lead: "一节马上上的课、三个要准备的资源、一个最想解决的问题。",
          widget: "action131",
          note: "8 分钟。写完打印/存为 PDF，拍照发群。两人一组，互为磨课伙伴。"
        },
        {
          type: "widget", kicker: "点灯 · 毕业",
          title: "我要点亮……",
          lead: "一个学生、一个课堂瞬间、一个改变。写下来，点亮一盏灯。",
          widget: "lightwall",
          note: "7 分钟。关灯。每人一盏小灯，说一句“我要点亮……”。说完把灯放在港口地图上。"
        },
        {
          type: "closing", kicker: "GENESIS · 教师特训营",
          title: "让每个孩子，都拥有创造未来的能力。",
          lead: "从今天开始，先点亮自己。",
          note: "5 分钟。合影。提醒：附件里有全部图表和工具，随时回来复习。"
        }
      ]
    }
  ]
};
