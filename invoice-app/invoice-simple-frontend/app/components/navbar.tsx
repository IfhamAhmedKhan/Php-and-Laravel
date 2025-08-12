"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";

const navItems = [
  { name: "Invoices", href: "/invoices" },
  { name: "Estimates", href: "/estimates" },
  { name: "Expenses", href: "/expenses" },
  { name: "Reports", href: "/reports" },
];

const dropdownItems = [
  { name: "Clients", href: "/clients" },
  { name: "Items", href: "/items" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Improved navigation handler with loading state
  const handleNavigation = (href: string) => {
    router.push(href);
    setShowDropdown(false);
  };

  return (
    <nav
      style={{
        background: "#2ED4A7",
        display: "flex",
        alignItems: "center",
        padding: "0 32px",
        height: "64px",
        color: "#fff",
        fontFamily: "sans-serif",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center" }}>
          <span style={{ marginRight: "8px" }}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 21 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.5257 0.366943L9.18097 10.1489L8.86262 10.3805L8.70634 10.4673L8.60794 10.502L8.49218 10.5425L8.4343 10.5599L8.36484 10.5715L8.27802 10.5772H8.11595H7.91915L7.82075 10.5715L7.73393 10.5599L7.6529 10.5425L7.58923 10.5252L0.730264 7.89154L0.579773 7.85681L0.504526 7.87997L0.429281 7.95521L0.406128 8.00731V8.07676L0.429281 8.18674L0.730264 8.57455L7.78602 18.3392L7.86127 18.4028L7.95388 18.4781L8.09858 18.5186L8.2375 18.5244L8.3822 18.4897L8.50954 18.4144L8.60794 18.3218L8.74107 18.1771L20.6589 0.505859V0.436401L20.6241 0.366943H20.5257Z"
                fill="white"
              />
            </svg>
          </span>
          <span style={{ fontWeight: "bold", fontSize: "16px" }}>
            Invoice Simple
          </span>
        </Link>

        {navItems.map((item) => (
          <Link key={item.name} href={item.href} passHref>
            <button
              style={{
                background:
                  pathname.startsWith(item.href) 
                    ? "rgba(0,0,0,0.15)" 
                    : "transparent",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
                padding: "8px 12px",
                fontWeight: "bold",
                fontSize: "15px",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseOver={(e) =>
                !pathname.startsWith(item.href) &&
                (e.currentTarget.style.background = "rgba(0,0,0,0.10)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background =
                  pathname.startsWith(item.href) 
                    ? "rgba(0,0,0,0.15)" 
                    : "transparent")
              }
            >
              {item.name}
            </button>
          </Link>
        ))}

        <div
          ref={dropdownRef}
          style={{ position: "relative", display: "inline-block" }}
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setTimeout(() => setShowDropdown(false), 200)}
        >
          <button
            style={{
              fontSize: "15px",
              background: showDropdown ? "rgba(0,0,0,0.10)" : "transparent",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "bold",
              padding: "8px 14px",
              borderRadius: "8px",
              transition: "background 0.2s",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            More <span style={{ fontSize: "13px" }}>{showDropdown ? "▲" : "▼"}</span>
          </button>

          {showDropdown && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                background: "#fff",
                color: "#2ED4A7",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                minWidth: "160px",
                zIndex: 10,
                display: "flex",
                flexDirection: "column",
              }}
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              {dropdownItems.map((item) => (
                <div
                  key={item.name}
                  style={{
                    padding: "12px 16px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    background: pathname.startsWith(item.href)
                      ? "rgba(46,212,167,0.1)"
                      : "transparent",
                    borderBottom: "1px solid rgba(0,0,0,0.05)",
                  }}
                  onClick={() => handleNavigation(item.href)}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.background = "rgba(46,212,167,0.1)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.background = pathname.startsWith(item.href)
                      ? "rgba(46,212,167,0.1)"
                      : "transparent")
                  }
                >
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Link href="/settings">
          <span
            style={{
              fontSize: "15px",
              padding: "8px 14px",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background 0.2s",
              fontWeight: "bold",
              background: pathname.startsWith("/settings")
                ? "rgba(0,0,0,0.15)"
                : "transparent",
            }}
            onMouseOver={(e) =>
              !pathname.startsWith("/settings") &&
              (e.currentTarget.style.background = "rgba(0,0,0,0.10)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.background = pathname.startsWith("/settings")
                ? "rgba(0,0,0,0.15)"
                : "transparent")
            }
          >
            Settings
          </span>
        </Link>

        <Link href="/login">
          <span
            style={{
              fontSize: "15px",
              padding: "8px 14px",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background 0.2s",
              fontWeight: "bold",
              background: pathname.startsWith("/login")
                ? "rgba(0,0,0,0.15)"
                : "transparent",
            }}
            onMouseOver={(e) =>
              !pathname.startsWith("/login") &&
              (e.currentTarget.style.background = "rgba(0,0,0,0.10)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.background = pathname.startsWith("/login")
                ? "rgba(0,0,0,0.15)"
                : "transparent")
            }
          >
            Login
          </span>
        </Link>

        <Link href="/signup">
          <span
            style={{
              fontSize: "15px",
              padding: "8px 14px",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background 0.2s",
              fontWeight: "bold",
              background: pathname.startsWith("/signup")
                ? "rgba(0,0,0,0.15)"
                : "transparent",
            }}
            onMouseOver={(e) =>
              !pathname.startsWith("/signup") &&
              (e.currentTarget.style.background = "rgba(0,0,0,0.10)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.background = pathname.startsWith("/signup")
                ? "rgba(0,0,0,0.15)"
                : "transparent")
            }
          >
            Sign Up
          </span>
        </Link>

        <button
          style={{
            background: "#fff",
            color: "#2ED4A7",
            border: "none",
            borderRadius: "8px",
            padding: "8px 16px",
            fontWeight: "bold",
            fontSize: "15px",
            cursor: "pointer",
            transition: "transform 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Upgrade Now
        </button>
      </div>
    </nav>
  );
}