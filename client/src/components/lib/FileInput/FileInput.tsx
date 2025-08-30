"use client"

import React, { useRef, useState } from "react"
import styles from "./FileInput.module.css"

export const FileInput = () => {
    const [drag, setDrag] = useState(false)
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDrag(true)
    }

    const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDrag(false)
    }

    const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
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
        const formData = new FormData()
        files.forEach((file) => {
            formData.append("files", file)
        })
        console.log(files)
    }

    const handleButtonClick = () => {
        fileInputRef.current?.click()
    }

    return (
        <div className={styles.file_input}>
            <div
                className={drag ? styles.drop_area_active : styles.drop_area}
                onDragStart={dragStartHandler}
                onDragLeave={dragLeaveHandler}
                onDragOver={dragStartHandler}
                onDrop={onDropHandler}
            >
                {drag ? "Отпустите файлы чтобы загрузить их" : "Перетащите файлы сюда"}
            </div>

            <input
                type="file"
                ref={fileInputRef}
                multiple
                style={{ display: "none" }}
                onChange={onFileSelect}
            />

            <button className={styles.button} type="button" onClick={handleButtonClick}>
                Выбрать файлы
            </button>
        </div>
    )
}
