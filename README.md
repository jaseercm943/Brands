# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.





AddOrder Form
 {/* BRAND */}
                                            <div className="grid gap-1">
                                                <Label htmlFor="brand">Brand*</Label>
                                                <select
                                                    name="brand"
                                                    id="brand"
                                                    className="select-light-arrow bg-gray-100 outline-gray-400 outline rounded-sm w-full py-1"
                                                    value={selectedBrand}
                                                    onChange={(e) => handleBrandChange(e)}
                                                >
                                                    <option value="" hidden>
                                                        Select Brand
                                                    </option>
                                                    {allBrand?.map((name, i) => (
                                                        <option value={name.id} key={name.id}>
                                                            {name.data.brandName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* MODEL */}
                                            <div className="grid gap-1">
                                                <Label htmlFor="model">Model Name*</Label>
                                                <select
                                                    value={selectedModel}
                                                    onChange={(e) => handleModelChange(e)}
                                                    name="model"
                                                    id="model"
                                                    className="select-light-arrow bg-gray-100 outline-gray-400 outline rounded-sm w-full py-1"
                                                >
                                                    <option value="" hidden>
                                                        Select Model
                                                    </option>
                                                    {modelNames?.map((model, i) => (
                                                        <option key={i} value={model.modelName}>
                                                            {model.modelName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="grid gap-1">
                                                <Label htmlFor="trim">Trim Name*</Label>
                                                <select
                                                    name="trim"
                                                    id="trim"
                                                    value={selectedTrim}
                                                    onChange={(e) => trimSelected(e.target.value,selectedModel,selectedBrand)}
                                                    className={`${
                                                        !selectedModel && "text-gray-400"
                                                    } select-light-arrow bg-gray-100 outline-gray-400 outline rounded-sm w-full py-1`}
                                                >
                                                    {selectedModel ? (
                                                        <option value="" hidden>
                                                            Select Trim
                                                        </option>
                                                    ) : (
                                                        <option value="" className="" hidden>
                                                            Select Model First*
                                                        </option>
                                                    )}
                                                    {trimNames?.map((trims, i) => (
                                                        <option value={trims} key={i}>
                                                            {trims}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="grid gap-1">
                                                <Label htmlFor="cc">Color Combination*</Label>
                                                <select
                                                    name="cc"
                                                    id="cc"
                                                    value={selectedColorComb}
                                                    onChange={(e)=>handleChangeColorComb(e)}
                                                    className="select-light-arrow text-gray-800 bg-gray-100 outline-gray-400 outline rounded-sm w-full py-1"
                                                >
                                                    <option value="" hidden>
                                                        Select Color Combination
                                                    </option>
                                                    {colorComb?.map((cc,i)=>
                                                        <option value={cc} key={i}>
                                                            {cc.extColor} + {cc.intColor}
                                                        </option>)}
                                                </select>
                                            </div>
