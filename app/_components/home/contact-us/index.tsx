import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import Link from "next/link";
import { IoPersonOutline } from "react-icons/io5";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { FaHandHoldingHeart } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { VscLocation } from "react-icons/vsc";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";

const contactUsSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(11),
  companyName: z.string().min(3),
  numberOfEmployees: z.coerce.number().min(1),
  subject: z.string().min(3),
  message: z.string().min(10),
});

const ContactUs = () => {
  const form = useForm<z.infer<typeof contactUsSchema>>({
    resolver: zodResolver(contactUsSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      message: "",
      email: "",
      phone: "",
      companyName: "",
      numberOfEmployees: 0,
      subject: "",
    },
  });

  const onSubmit = (data: z.infer<typeof contactUsSchema>) => {
    console.log(data);
  };

  return (
    <div className="bg-gray-100/50 font-roboto">
      <div className="p-10 py-20 text-center">
        <h2 className="text-3xl font-bold text-blue-900">Contact Us</h2>
        <p className="text-gray-600">
          We are here to help. Reach out to us for any inquiries or support.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-10 py-20 lg:items-start lg:flex-row">
        <div className="w-full max-w-xl p-8 bg-white">
          <h3 className="text-2xl font-bold">Email Us</h3>
          <p className="mb-10 text-sm text-gray-700">Fill the form below</p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your First Name"
                          {...field}
                          className="inline-block w-full border-gray-200 rounded-lg placeholder:text-gray-400 "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your Last Name"
                          className="inline-block w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your Phone"
                        min={2}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your Company Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="numberOfEmployees"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Employees</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your Number of Employees"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full text-white bg-blue-800" type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </div>

        <div className="w-full max-w-xl px-9">
          <div className="space-y-10 ">
            <div className="flex gap-4">
              <div className="p-4 bg-blue-700 rounded-xl h-fit">
                <IoPersonOutline className="w-10 h-10 text-white" />
              </div>

              <div>
                <h4 className="font-bold">Administrator Support</h4>
                <p>
                  For HR managers or administrators,{" "}
                  <span className="text-blue-600">access our help center</span>{" "}
                  for detailed guides or speak directly to our support team
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="p-4 bg-blue-700 rounded-xl">
                <HiOutlineUserGroup className="w-10 h-10 text-white" />
              </div>

              <div>
                <h4 className="font-bold">Employee Support</h4>
                <p>
                  If you are an employee,connect with your company{"'"}s HR
                  department or{" "}
                  <span className="text-blue-600">
                    explore our help section
                  </span>
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="p-4 bg-blue-700 rounded-xl h-fit">
                <FaHandHoldingHeart className="w-10 h-10 text-white" />
              </div>
              <div>
                <h4 className="font-bold">See How Cynegie Works</h4>
                <Link
                  href={"/contact-us"}
                  className="inline-block p-2 mt-4 text-blue-600 border border-blue-600 rounded-xl "
                >
                  Request Live Demo
                </Link>
              </div>
            </div>
          </div>
          <div className="flex mt-32 gap-7">
            <div className="flex gap-2">
              <div>
                <FiPhone className="w-5 h-5" />
              </div>
              <div>
                <p>Office Number</p>
                <p className="mt-3 text-sm text-gray-400">
                  +234(0)803-385-6126
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <div>
                <VscLocation className="w-7 h-7" />
              </div>
              <div>
                <p>Office Address</p>
                <p className="mt-3 text-sm text-gray-400">
                  Dolphin Estate, Ikoyi, Lagos
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
