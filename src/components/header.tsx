import React from "react";

interface HeaderProps {
  title: React.ReactNode;
}

export function Header({ title }: HeaderProps) {
  return (
    <div className="flex p-4 border-b bg-secondary border-border">{title}</div>
  );
}
