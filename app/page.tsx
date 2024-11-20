/** @format */

"use client";
import { SpinnerButton } from "@/components/ui/SpinnerButton";
/** @format */

import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
// import Link from "next/link";
import { useState } from "react";

export default function Home() {
	const router = useRouter();
	const [prompt, setPrompt] = useState(
		"Demo Prompt: What was the highest price of electricity in Britain along with stellement period."
	);
	const [response, setResponse] = useState("...");
	const [loading, setLoading] = useState(false);
	const [back, setBack] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const [placeholder, setPlaceholder] = useState(
		"Demo Prompt: What was the highest price of electricity in Britain along with stellement period."
	);
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
		setDisabled(false);
		setLoading(false);
	};
	const clearclickHandler = async () => {
		setPrompt("");
		setResponse("...");
		setDisabled(true);
		setPlaceholder("...");
	};

	const backclickHandler = async () => {
		setBack(true);
		setResponse("...");
		setPlaceholder("...");
		// redicet page to this url 100xnavi.com
		setBack(false);
		// router.push("https://100xnavi.com");
		router.push("/");
	};
	return (
		// <div className='flex flex-col min-h-screen justify-start items-center w-full pt-12'>
		// 	<div>
		// 		<div className='text-slate-500 text-2xl  underline'>
		// 			<h1>Testing Electricity Prices 01/09/2024-08/09/2024</h1>
		// 		</div>
		// 		<span className=' pt-2 text-slate-500'>Enter Prompt</span>
		// 		<br />
		// 		<div className='w-80 pt-4'>
		// 			<Textarea
		// 				placeholder={placeholder}
		// 				className='placeholder-faded h-40'
		// 				onChange={(event) => {
		// 					setPrompt(event.target.value);
		// 				}}
		// 			/>
		// 			<br />
		// 			<div className='flex justify-between'>
		// 				<div className='space-x-2'>
		// 					<SpinnerButton
		// 						name='Hit BedRock'
		// 						state={loading}
		// 						onClick={clickHandler}></SpinnerButton>
		// 					{/* <Link href='https://100xnavi.com'>
		// 					<SpinnerButton name='Go Back' state={back} />
		// 					</Link> */}
		// 					<SpinnerButton
		// 						name='Go Back'
		// 						state={back}
		// 						onClick={backclickHandler}
		// 					/>
		// 				</div>
		// 				<div>
		// 					<SpinnerButton
		// 						disabled={disabled}
		// 						variant={"secondary"}
		// 						name='Clear'
		// 						state={back}
		// 						onClick={clearclickHandler}></SpinnerButton>
		// 				</div>
		// 			</div>
		// 			{/* <SpinnerButton>Go back</SpinnerBu back</SpinnerButton> */}
		// 		</div>
		// 		<br />
		// 		<br />
		// 		<div className='text-slate-500 text-3xl underline'>
		// 			<h1>Response</h1>
		// 		</div>
		// 	<div className=''>
		// 		<div className='flex flex-col flex-row'>
		// 	</div>
		// 			<span className='text-slate-500'>{response}</span>
		// 		</div>
		// 	</div>
		// </div>
		<div className='flex flex-col min-h-screen justify-start items-center w-full pt-14'>
			<div className='w-80 md:w-96 lg:w-[28rem]'>
				{" "}
				{/* Responsive width */}
				<div className='text-slate-500 text-2xl underline text-center'>
					<h1>Analyzing Electricity Prices 01/09/2024-08/09/2024</h1>
				</div>
				<span className='pt-2 text-slate-500 block text-center'>
					Enter Prompt
				</span>
				<br />
				<div className='pt-4'>
					<Textarea
						placeholder={placeholder}
						className='placeholder-faded h-40 w-full'
						onChange={(event) => {
							setPrompt(event.target.value);
						}}
					/>
					<br />
					<div className='flex justify-between mt-4'>
						<div className='space-x-2'>
							<SpinnerButton
								name='Hit BedRock'
								state={loading}
								onClick={clickHandler}></SpinnerButton>
							<SpinnerButton
								name='Go Back'
								state={back}
								onClick={backclickHandler}
							/>
						</div>
						<div>
							<SpinnerButton
								disabled={disabled}
								variant={"secondary"}
								name='Clear'
								state={back}
								onClick={clearclickHandler}></SpinnerButton>
						</div>
					</div>
				</div>
				<br />
				<br />
				<div className='text-slate-500 text-3xl underline text-center'>
					<h1>Response</h1>
				</div>
				<div className='w-full pt-4'>
					<div className='flex flex-col'>
						<span className='text-slate-500 break-words'>{response}</span>
					</div>
				</div>
			</div>
		</div>
	);
}
