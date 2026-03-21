import { useEffect, useRef, useCallback } from "react";

import { RECAPTCHA_SITE_KEY } from "@/lib/constants";

declare global {
  interface Window {
    grecaptcha: {
      render: (container: HTMLElement, params: { sitekey: string; callback: (token: string) => void; "expired-callback": () => void; theme?: string }) => number;
      reset: (widgetId: number) => void;
      ready: (cb: () => void) => void;
    };
  }
}

interface ReCaptchaProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
}

const ReCaptcha = ({ onVerify, onExpire }: ReCaptchaProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const renderedRef = useRef(false);

  const handleVerify = useCallback((token: string) => {
    onVerify(token);
  }, [onVerify]);

  const handleExpire = useCallback(() => {
    onExpire?.();
  }, [onExpire]);

  useEffect(() => {
    if (renderedRef.current || !containerRef.current) return;

    const renderWidget = () => {
      if (!containerRef.current || renderedRef.current) return;
      renderedRef.current = true;
      widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
        sitekey: RECAPTCHA_SITE_KEY,
        callback: handleVerify,
        "expired-callback": handleExpire,
        theme: "light",
      });
    };

    if (window.grecaptcha?.render) {
      window.grecaptcha.ready(renderWidget);
    } else {
      // Wait for script to load
      const interval = setInterval(() => {
        if (window.grecaptcha?.render) {
          clearInterval(interval);
          window.grecaptcha.ready(renderWidget);
        }
      }, 200);
      return () => clearInterval(interval);
    }
  }, [handleVerify, handleExpire]);

  return <div ref={containerRef} className="flex justify-center" />;
};

export default ReCaptcha;
