"use client"

import React, { useRef, useState } from "react"
import styles from "./FileInput.module.css"

export const FileInput = () => {
    const [drag, setDrag] = useState(false)
    const [filesList, setFilesList] = useState<File[]>([])
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setDrag(true)
    }

    const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setDrag(false)
    }

    const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        const files = [...e.dataTransfer.files]
        handleFiles(files)
        setDrag(false)
    }

    const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return
        const files = [...e.target.files]
        handleFiles(files)
    }

    const handleFiles = (files: File[]) => {
        setFilesList((prev) => [...prev, ...files])
        const formData = new FormData()
        files.forEach((file) => formData.append("files", file))
        console.log(files)
    }

    const handleButtonClick = () => {
        fileInputRef.current?.click()
    }

    const removeFile = (index: number) => {
        setFilesList((prev) => prev.filter((_, i) => i !== index))
    }

    return (
        <div className={styles.file_input}>
            <input
                type="file"
                ref={fileInputRef}
                multiple
                style={{ display: "none" }}
                onChange={onFileSelect}
            />

            <button className={styles.button} type="button" onClick={handleButtonClick}>
                Выберите файлы
            </button>

            {drag ? (
                <div
                    className={styles.drop_area_active}
                    onDragStart={dragStartHandler}
                    onDragLeave={dragLeaveHandler}
                    onDragOver={dragStartHandler}
                    onDrop={onDropHandler}
                >
                    Отпустите файлы чтобы загрузить их
                </div>
            ) : (
                <div
                    className={styles.drop_area}
                    onDragStart={dragStartHandler}
                    onDragLeave={dragLeaveHandler}
                    onDragOver={dragStartHandler}
                >
                    Или перетащите файлы чтобы загрузить их
                </div>
            )}
            
            {filesList.length > 0 && (
                <ul className={styles.file_list}>
                    {filesList.map((file, index) => (
                        <li key={index}>
                            <span>{file.name}</span>
                            <button
                                type="button"
                                className={styles.file_remove}
                                onClick={() => removeFile(index)}
                            >
                                ✕
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
