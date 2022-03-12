import React, {useState, useRef, useEffect} from 'react'
import {io} from 'socket.io-client'

const socket = io('http://localhost:4000')

socket.on('connect', () => {console.log(socket.id)})

export default function Canvas() {
    const [isDrawing, setIsDrawing] = useState(false)
    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    let strokes = []
    useEffect(() => {
        const canvas = canvasRef.current
        canvas.width = window.innerWidth*2
        canvas.height = window.innerHeight*2
        canvas.style.width = `${window.innerWidth}px`
        canvas.style.height = `${window.innerHeight}px`

        const ctx = canvas.getContext("2d")
        ctx.scale(2, 2)
        ctx.lineCap = "round"
        ctx.strokeStyle = "black"
        ctx.lineWidth = 5
        contextRef.current = ctx

        setInterval(() => {
            console.log(strokes)
            socket.emit('next-strokes', strokes)
            strokes.length = 0;
        }, 100)
    }, [])

    socket.on('draw-strokes', points => {
        if(!points.length) return
        contextRef.current.beginPath()
        contextRef.current.moveTo(points[0][0], points[0][1])
        points.forEach(([x, y]) => {
            contextRef.current.lineTo(x, y)
            contextRef.current.stroke()
        })
    })

    const startDrawing = ({nativeEvent}) => {
        setIsDrawing(true)
        const {offsetX, offsetY} = nativeEvent
        strokes.push([offsetX, offsetY])
        contextRef.current.beginPath()
        contextRef.current.moveTo(offsetX, offsetY)
    }

    const stopDrawing = () => {
        setIsDrawing(false)
        contextRef.current.closePath()
    }

    const draw = ({nativeEvent}) => {
        if(!isDrawing) return
        const {offsetX, offsetY} = nativeEvent
        strokes.push([offsetX, offsetY])
        // console.log(strokes)
        contextRef.current.lineTo(offsetX, offsetY)
        contextRef.current.stroke()
    }
    
    return (
    <canvas 
        onMouseDown = {startDrawing}
        onMouseUp = {stopDrawing}
        onMouseMove = {draw}
        ref = {canvasRef}
    />
  )
}
