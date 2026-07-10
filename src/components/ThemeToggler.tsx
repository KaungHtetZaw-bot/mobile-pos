import { Moon, Sun } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { flushSync } from 'react-dom';
import { useI18n } from '../i18nContext';

export const ThemeToggler = () => {
    const { t } = useI18n()
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        const saved = localStorage.getItem('trp_dark_mode');
        return saved ? JSON.parse(saved) : false;
    });
    const [isThemeAnimating, setIsThemeAnimating] = useState(false);
    const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
        const isDark = !darkMode;

        if (
        !document.startViewTransition || 
        window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        isThemeAnimating
        ) {
        setDarkMode(isDark);
        return;
        }

        setIsThemeAnimating(true);
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX || (rect.left + rect.width / 2);
        const y = event.clientY || (rect.top + rect.height / 2);
        const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
        );

        const transition = document.startViewTransition(() => {
        flushSync(() => {
            setDarkMode(isDark);
        });
        });

        transition.ready.then(() => {
        const clipPath = [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
        ];
        
        const animation = document.documentElement.animate(
            {
            clipPath: clipPath,
            },
            {
            duration: 500,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            pseudoElement: '::view-transition-new(root)',
            }
        );

        animation.onfinish = () => {
            setIsThemeAnimating(false);
        };
        }).catch(() => {
        setIsThemeAnimating(false);
        });
    };

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('trp_dark_mode', JSON.stringify(darkMode));
    }, [darkMode]);
  return (
    <button 
        onClick={toggleTheme}
        className="text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-50 transition-all cursor-pointer relative flex items-center justify-center active:scale-90"
        title={darkMode ? t('theme.lightMode') : t('theme.darkMode')}
    >
        {darkMode ? (
        <Sun className="w-5 h-5 text-amber-500 fill-amber-400" />
        ) : (
        <Moon className="w-5 h-5 text-slate-500 fill-slate-100" />
        )}
    </button>
  )
}