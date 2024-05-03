"use client";


export default function ContactForm() {

    return (
        <>
            <form
                // onSubmit={handleSubmit}
                className="py-4 my-4 border-t flex flex-col gap-5"
            >
                <div className="flex flex-col gap-2">
                    <label htmlFor="fullname" className="font-bold text-gray-800">Full Name</label>
                    <input
                        type="text"
                        id="fullname"
                        minLength={1}
                        maxLength={50}
                        required
                        placeholder="Type your full name here..."
                        className="shadow-md px-1 py-2 border border-slate-300"

                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-bold text-gray-800">Email</label>
                    <input
                        type="text"
                        id="email"
                        minLength={6}
                        maxLength={50}
                        required
                        placeholder="Type your email here..."
                        className="shadow-md px-1 py-2 border border-slate-300"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="font-bold text-gray-800">Your Message</label>
                    <textarea
                        id="message"
                        minLength={2}
                        maxLength={500}
                        required
                        placeholder="Type your message here..."
                        className="shadow-md px-1 py-2 border border-slate-300 h-32"
                    ></textarea>
                </div>

                <button className={"button w-48"} type="submit">
                    Send
                </button>
            </form>

        </>
    );
}