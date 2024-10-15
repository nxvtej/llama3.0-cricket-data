/** @format */

"use client";
import { Button } from "@/components/ui/button";
/** @format */

import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function Home() {
	const [prompt, setPrompt] = useState("name some cricketers");
	const [response, setResponse] = useState("...");

	const url = process.env.NEXT_PUBLIC_apiroute;
	if (!url) {
		// console.error("URL not found");
		throw new Error("URL not found");
	}
	const data = JSON.stringify({
		prompt: prompt,
	});

	const clickHandler = async () => {
		// console.log(url);
		try {
			// const response = await axios(config);
			// const response = await fetch({
			// 	url: url,
			// 	method: "POST",
			// 	headers: {
			// 		"Content-Type": "application/json",
			// 	},
			// 	body: data,
			// });
			// setResponse(response.data.text);
			// console.log(response);
			const resp = await fetch(url, {
				method: "POST",
				body: data,
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!resp.ok) {
				console.log("error");
			}
			const datap = await resp.json();
			setResponse(datap.text);
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<div className='flex flex-col min-h-screen justify-center items-center'>
			<div>
				<div className='text-slate-500 text-3xl underline'>
					<h1>Testing API</h1>
				</div>
				<span className=' pt-2 text-slate-500'>Enter Prompt</span>
				<br />
				<div className='w-80 pt-4'>
					<Textarea
						placeholder='name some cricketers'
						className='placeholder-faded'
						onChange={(event) => {
							setPrompt(event.target.value);
						}}
					/>
					<br />
					<Button variant='secondary' onClick={clickHandler}>
						Hit BedRock
					</Button>
				</div>
				<br />
				<br />
				<div className='text-slate-500 text-3xl underline'>
					<h1>Response</h1>
				</div>
				<span className='text-slate-500'>{response}</span>
			</div>
		</div>
	);
}
