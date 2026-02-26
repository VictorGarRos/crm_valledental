import React, { useState, useRef, useEffect } from 'react';
import styles from './CustomSelect.module.css';

interface Option {
    value: string;
    label: string;
    icon?: string;
}

interface CustomSelectProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    label?: string;
    searchable?: boolean;
}

const CustomSelect = ({
    options,
    value,
    onChange,
    placeholder = "Seleccionar...",
    label,
    searchable = false
}: CustomSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const selectedOption = options.find(opt => opt.value === value);

    const filteredOptions = options.filter(opt =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        if (!isOpen && searchable) {
            setTimeout(() => inputRef.current?.focus(), 0);
        }
    };

    const handleSelect = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
        setSearchTerm('');
    };

    return (
        <div className={styles.container} ref={containerRef}>
            {label && <label className={styles.label}>{label}</label>}
            <div
                className={`${styles.selectWrapper} ${isOpen ? styles.active : ''}`}
                onClick={toggleDropdown}
            >
                <div className={styles.currentValue}>
                    {selectedOption ? (
                        <div className={styles.selectedOption}>
                            {selectedOption.icon && <span className={styles.optionIcon}>{selectedOption.icon}</span>}
                            <span>{selectedOption.label}</span>
                        </div>
                    ) : (
                        <span className={styles.placeholder}>{placeholder}</span>
                    )}
                </div>
                <div className={styles.arrow}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>

            {isOpen && (
                <div className={styles.dropdown}>
                    {searchable && (
                        <div className={styles.searchWrapper} onClick={e => e.stopPropagation()}>
                            <input
                                ref={inputRef}
                                type="text"
                                className={styles.searchInput}
                                placeholder="Buscar..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                    )}
                    <div className={styles.optionsList}>
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map(option => (
                                <div
                                    key={option.value}
                                    className={`${styles.option} ${value === option.value ? styles.selected : ''}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleSelect(option.value);
                                    }}
                                >
                                    {option.icon && <span className={styles.optionIcon}>{option.icon}</span>}
                                    <span>{option.label}</span>
                                    {value === option.value && (
                                        <span className={styles.checkIcon}>
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2.5 6L5 8.5L9.5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className={styles.noResults}>No se encontraron resultados</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
