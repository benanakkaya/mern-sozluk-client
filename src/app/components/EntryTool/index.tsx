"use client"
import store from '@/redux/store';
import { fetchTopicData } from '@/redux/Topic/TopicSlice';
import axios  from 'axios';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';


interface User {
  loginned: boolean;
  loggedUser: {
    id: string;
    username:string;
  };
}

interface ResponseData {
  message: string;
  topic?: {
    _id: string;
    title: string;
  };
}

const EntryTool = () => {
  const [entryText, setEntryText] = useState("");
  const { loginned, loggedUser } = useSelector((state: { user: User }) => state.user);

  const {currentTopic:topic } = useSelector((state:any) => state.topic);

  type AppDispatch = typeof store.dispatch;
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const createNewEntry = async (values: {
    topic: string;
    owner: string;
    text: string;
  }): Promise<any> => {
    const res = await axios.post<ResponseData>("https://mern-sozluk-backend.onrender.com/entry/new-entry", {
      topic: values.topic,
      owner: values.owner,
      text: values.text
    });
    return res.data;
  };

  const handleBkz = () => {
    const selectionStart = textareaRef.current!.selectionStart;
    const selectionEnd = textareaRef.current!.selectionEnd;

    if (selectionStart !== selectionEnd) {
      const selectedText = entryText.slice(selectionStart!, selectionEnd!);
      const newText =
        entryText.slice(0, selectionStart!) +
        `(bkz: ${selectedText})` +
        entryText.slice(selectionEnd!);
      setEntryText(newText);
    } else {
      const newBkz = prompt("hangi başlığa bkz verilecek?");
      setEntryText((prev) => prev + `(bkz: ${newBkz})`);
    }
  };

  const handleLink = () => {
    const selectionStart = textareaRef.current!.selectionStart;
    const selectionEnd = textareaRef.current!.selectionEnd;

    if (selectionStart !== selectionEnd) {
      const selectedText = entryText.slice(selectionStart!, selectionEnd!);
      const linkPlaceholder = prompt("link nasıl gözüksün?", selectedText);
      const newText =
        entryText.slice(0, selectionStart!) +
        `[${selectedText} ${linkPlaceholder}]` +
        entryText.slice(selectionEnd!);
      setEntryText(newText);
    } else {
      const newLink :any = prompt("hangi adrese gidilecek?", "http://");
      const linkPlaceholder = prompt("link nasıl gözüksün?", newLink);
      setEntryText((prev) => prev + `[${newLink} ${linkPlaceholder}]`);
    }
  };

  const handleSubmit = async () => {
    if (entryText.length > 5) {
      if (topic._id) {
        const values = {
          topic: topic?._id,
          owner: loggedUser?.id,
          text: entryText
        };
        await createNewEntry(values)
          .then((res:any) => {
            toast.success(res.message);
            setEntryText("");
            dispatch(fetchTopicData({title:topic?.title,page:topic?.totalPages ?? 1}));
            router.push(`/topic/${topic.title}?page=${topic?.totalPages ?? 1}`);
          })
          .catch((err) => {
            toast.error(err.response.data.message);
            setEntryText("");
          });
      } else {
        const res = await axios
          .post<ResponseData>("https://mern-sozluk-backend.onrender.com/topic/new-topic", { title: topic?.title })
          .then(async (res) => {
            const values = {
              topic: res.data.topic!._id,
              owner: loggedUser?.id,
              text: entryText
            };
            await createNewEntry(values)
              .then((res:any) => {
                setEntryText("");
                toast.success(res.message);
                dispatch(fetchTopicData({title:topic.title,page:topic.totalPages}));
                router.push(`/topic/${topic.title}?page=${topic.totalPages}`);
              })
              .catch((err) =>{
                setEntryText("");
                toast.error(err.response.data.message)
              });
          });
      }
    } else {
      toast.error("entry çok kısa");
    }
  };

  return (
    <>
      {loginned && (
        <fieldset className="w-full flex flex-col gap-2 bg-[#474747] p-2 rounded-md">
          <div className="flex items-center gap-2 text-xs">
            <button
              title="herhangi bir başlığı örnek verebilirsiniz"
              onClick={handleBkz}
              className="rounded-md px-2 py-1 border-[1px] border-customWhite"
            >
              (bkz: )
            </button>
            <button
              title="link ekleyebilirsiniz"
              onClick={handleLink}
              className="rounded-md px-2 py-1 border-[1px] border-customWhite"
            >
              http://
            </button>
          </div>
          <textarea
            ref={textareaRef}
            value={entryText}
            onChange={(e) => setEntryText(e.target.value)}
            placeholder={`${topic?.title} hakkında bilgi ver...`}
            className="w-full p-2 min-h-[80px] outline-none rounded-md text-black text-sm"
          ></textarea>
          <div>
            <button onClick={handleSubmit} className="rounded-md bg-primary text-white px-2 py-1 text-xs">
              yolla
            </button>
          </div>
        </fieldset>
      )}
    </>
  );
};

export default EntryTool;
