/** @format */

"use client";
import { SpinnerButton } from "@/components/ui/SpinnerButton";
/** @format */

import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function Home() {
	const [prompt, setPrompt] = useState("name some cricketers");
	const [response, setResponse] = useState("...");
	const [loading, setLoading] = useState(false);

	const url = process.env.NEXT_PUBLIC_APIROUTE;
	if (!url) {
		throw new Error("URL not found");
	}
	const data = JSON.stringify({
		prompt: prompt,
	});

	const clickHandler = async () => {
		// console.log(url);
		setLoading(true);
		try {
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
		setLoading(false);
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
					<SpinnerButton name='Submit' state={loading} onClick={clickHandler}>
						Hit BedRock
					</SpinnerButton>
				</div>
				<br />
				<br />
				<div className='text-slate-500 text-3xl underline'>
					<h1>Response</h1>
				</div>
			</div>
			<div className='w-80'>
				<div className='flex flex-col flex-row'>
					<span className='text-slate-500'>{response}</span>
				</div>
			</div>
		</div>
	);
}
