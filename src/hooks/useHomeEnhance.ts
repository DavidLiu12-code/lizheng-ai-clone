import { useEffect } from "react";
import { toast } from "sonner";

function paintCity(canvas: HTMLCanvasElement) {
  const parent = canvas.parentElement;
  if (!parent) return () => undefined;
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => undefined;

  const dots: { x: number; y: number; r: number; a: number; s: number }[] = [];
  let width = 0;
  let height = 0;
  let raf = 0;
  let start = performance.now();

  const resize = () => {
    const rect = parent.getBoundingClientRect();
    width = Math.max(320, Math.floor(rect.width));
    height = Math.max(220, Math.floor(rect.height || width * 0.42));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    dots.length = 0;
    const count = Math.round((width * height) / 900);
    for (let i = 0; i < count; i++) {
      dots.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.6 + 0.4,
        a: Math.random() * Math.PI * 2,
        s: 0.15 + Math.random() * 0.35,
      });
    }
  };

  const draw = (now: number) => {
    const t = (now - start) / 1000;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#0f3d23";
    // connections
    ctx.lineWidth = 0.6;
    for (let i = 0; i < dots.length; i += 7) {
      const a = dots[i];
      const b = dots[(i + 11) % dots.length];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      if (dx * dx + dy * dy < 90 * 90) {
        ctx.strokeStyle = "rgba(143, 212, 164, 0.18)";
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
    for (const d of dots) {
      const y = d.y + Math.sin(t * d.s + d.a) * 3;
      ctx.beginPath();
      ctx.fillStyle = d.r > 1.4 ? "rgba(255, 232, 180, 0.9)" : "rgba(143, 212, 164, 0.85)";
      ctx.arc(d.x, y, d.r, 0, Math.PI * 2);
      ctx.fill();
    }
    raf = requestAnimationFrame(draw);
  };

  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(parent);
  raf = requestAnimationFrame(draw);
  return () => {
    ro.disconnect();
    cancelAnimationFrame(raf);
  };
}

export function useHomeEnhance() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".rv"));
    const io = reduce
      ? null
      : new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting) {
                entry.target.classList.remove("pre");
                io?.unobserve(entry.target);
              }
            }
          },
          { rootMargin: "0px 0px -6% 0px" },
        );
    for (const node of nodes) {
      const rect = node.getBoundingClientRect();
      if (!reduce && rect.height && rect.top > window.innerHeight) {
        node.classList.add("pre");
        io?.observe(node);
      }
    }

    const list = document.getElementById("calls-list");
    const more = document.querySelector<HTMLButtonElement>(".calls-more");
    const onMore = () => {
      if (!list || !more) return;
      const open = list.classList.toggle("open");
      more.setAttribute("aria-expanded", String(open));
      const zh = document.documentElement.lang !== "en";
      more.textContent = open
        ? zh
          ? "收起判断"
          : "Show fewer calls"
        : zh
          ? "再看另外3条判断"
          : "See 3 more calls";
    };
    more?.addEventListener("click", onMore);

    const form = document.querySelector<HTMLFormElement>(".lz-ask-form");
    const textarea = form?.querySelector<HTMLTextAreaElement>("textarea");
    const submit = form?.querySelector<HTMLButtonElement>('button[type="submit"]');
    const modes = form?.querySelectorAll<HTMLButtonElement>(".lz-ask-modes button");
    const hint = form?.querySelector<HTMLElement>(".lz-ask-mode-hint");
    const hints = [
      document.documentElement.lang === "en"
        ? "Ask about a concept, a judgment, or something you have not thought through."
        : "问一个概念、一个判断，或一直没想通的地方。",
      document.documentElement.lang === "en"
        ? "Tell me what you want to learn, and I will point you to the first reading."
        : "说一下你想弄懂的方向，我会告诉你该从哪篇读起。",
    ];
    const onInput = () => {
      if (submit && textarea) submit.disabled = textarea.value.trim().length === 0;
    };
    textarea?.addEventListener("input", onInput);
    onInput();
    modes?.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        modes.forEach((other) => other.setAttribute("aria-pressed", String(other === btn)));
        if (hint) hint.textContent = hints[index] ?? hints[0];
      });
    });

    const onSubmit = (event: Event) => {
      event.preventDefault();
      const question = textarea?.value.trim();
      if (!question || !form) return;
      const safe = question.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch] || ch));
      let box = form.parentElement?.querySelector<HTMLElement>(".lz-ask-mock");
      if (!box && form.parentElement) {
        box = document.createElement("div");
        box.className = "lz-ask-mock";
        form.parentElement.appendChild(box);
      }
      if (box) {
        const isEn = document.documentElement.lang === "en";
        box.innerHTML = isEn
          ? `<p class="lz-ask-mock-q">${safe}</p><p>This preview cannot call Ask Lizheng’s retrieval backend. On the original site, answers are grounded in public essays and talks, with citations back to the source. Open the live page to ask for real.</p><p><a class="lz-link" href="https://ask.lizheng.ai/" target="_blank" rel="noopener noreferrer">Open Ask Lizheng <i aria-hidden="true">→</i></a></p>`
          : `<p class="lz-ask-mock-q">${safe}</p><p>这是复刻站点的演示回答。原站「问问立正」由 ask.lizheng.ai 根据公开文章和视频检索生成，每一段都能点回原文。本预览没有接入该回答后端。</p><p><a class="lz-link" href="https://ask.lizheng.ai/" target="_blank" rel="noopener noreferrer">打开完整页面 <i aria-hidden="true">→</i></a></p>`;
      }
      toast.message(document.documentElement.lang === "en" ? "Preview only — live Q&A stays on ask.lizheng.ai" : "演示回答：完整问答请到 ask.lizheng.ai");
    };
    form?.addEventListener("submit", onSubmit);

    const canvas = document.querySelector<HTMLCanvasElement>("canvas.dots");
    const stopCity = canvas ? paintCity(canvas) : () => undefined;

    return () => {
      io?.disconnect();
      more?.removeEventListener("click", onMore);
      form?.removeEventListener("submit", onSubmit);
      textarea?.removeEventListener("input", onInput);
      stopCity();
    };
  }, []);
}
