import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./PostForm.css"; 

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            tittle: post?.tittle || "", 
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
        mode: "onSubmit",
    });

    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);

    useEffect(() => {
        console.log("User Data:", userData);
    }, [userData]);

    const submit = async (data) => {
        try {
            console.log("Data before submitting:", data);
    
            if (post) {
                const file = data.image?.[0] ? await appwriteService.uploadFile(data.image[0]) : null;
    
                if (file) {
                    await appwriteService.deleteFile(post.featuredImage);
                }
    
                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : post.featuredImage, 
                });
    
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                
                if (!data.image?.[0]) {
                    console.error("Image is required.");
                    return;
                }
    
                const file = await appwriteService.uploadFile(data.image[0]);
    
                if (file) {
                    const dbPost = await appwriteService.createPost({ 
                        ...data, 
                        featuredImage: file.$id, 
                        userId: userData.$id 
                    });
    
                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                } else {
                    console.error("File upload failed");
                }
            }
        } catch (error) {
            console.error("Error submitting post:", error);
        }
    };
    
    
    const slugTransform = useCallback((value) => {
        if (typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, "");
        }
        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "tittle") { 
                setValue("slug", slugTransform(value.tittle || ""), { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form 
            onSubmit={handleSubmit(submit)} 
            className="post-form" 
            autoComplete="off"
        >
            <div className="post-form-left">
                
                <Input
                    label="Tittle :" 
                    placeholder="Tittle"
                    {...register("tittle", { required: true })} 
                />
                <Input
                    label="Description" 
                    placeholder="Add a description: "
                    {...register("description", { required: true })} 
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    {...register("slug", { required: true })}
                    onInput={(e) => setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="post-form-right">
                <Input
                    label="Featured Image :"
                    type="file"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && post.featuredImage && (
                    <div className="post-image-preview">
                        <img 
                            src={post?.featuredImage ? appwriteService.getFilePreview(post.featuredImage) 
                                : "/default-image.png"} 
                            alt={post?.tittle } 
                        />
                    </div>
                )}
                <Select options={["active", "inactive"]} 
                label="Status" {...register("status", { required: true })} />
                
                <button type="submit" className={post ? "update-button" : "submit-button"}>
                    {post ? "Update" : "Submit"}
                </button>
            </div>
        </form>
    );
}

export default PostForm;
